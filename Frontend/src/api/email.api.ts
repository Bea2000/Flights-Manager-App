import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/email/send`, {
      to,
      subject,
      text,
      html,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending email', error);
    throw error;
  }
};
