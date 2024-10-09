import axios from 'axios';
import { createTransactionType, validateTransactionType } from '@/types';

const viewTransactions = `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`;
const getRequest = `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/requests`;
const validateTransaction = `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/validate`;

// eslint-disable-next-line import/prefer-default-export
export const TransbankAPI = {
  createTransaction: async (data: createTransactionType) => axios.post(viewTransactions, data),
  getTransactionStatus: async (token: string) => axios.get(`${viewTransactions}/${token}`),
  getRequest: async (token: string) => axios.get(`${getRequest}/${token}`),
  validateTransaction: async (data: validateTransactionType) => (
    axios.post(validateTransaction, data)
  ),
};
