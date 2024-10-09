import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import axios from 'axios';
import { MqttService } from 'src/mqtt/mqtt.service';
import sequelize from '../db/config';

@Injectable()
export class TransactionsService {
  constructor(private mqttService: MqttService) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { buy_order, session_id, amount, return_url } = createTransactionDto;
    const apiKeyId = '597055555532';
    const apiKeySecret =
      '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

    const headers = {
      'Tbk-Api-Key-Id': apiKeyId,
      'Tbk-Api-Key-Secret': apiKeySecret,
      'Content-Type': 'application/json',
    };

    const data = {
      buy_order,
      session_id,
      amount,
      return_url,
    };

    try {
      const response = await axios.post(
        'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions',
        data,
        { headers },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error creating transaction:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Error creating transaction');
    }
  }

  findAll() {
    return `This action returns all transactions`;
  }

  async findOne(token: string) {
    const apiKeyId = '597055555532';
    const apiKeySecret =
      '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

    const headers = {
      'Tbk-Api-Key-Id': apiKeyId,
      'Tbk-Api-Key-Secret': apiKeySecret,
      'Content-Type': 'application/json',
    };
    console.log(token);
    try {
      const response = await axios.put(
        `https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`,
        {},
        { headers },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error getting transaction:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Error getting transaction');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  validate(valid: boolean, request_id: string) {
    const data = {
      request_id: request_id,
      group_id: '10',
      seller: 0,
      valid: valid,
    };
    this.mqttService.publishMessage(
      `${process.env.MQTT_CHANNEL}/validation`,
      JSON.stringify(data),
    );
    return 'Validation sent';
  }

  async findTransactionByRequestId(transaction_id: string) {
    return await sequelize.models.Request.findOne({
      where: {
        transaction_token: transaction_id,
      },
      attributes: ['request_id'],
    });
  }
}
