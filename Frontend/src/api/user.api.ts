// eslint-disable-next-line import/no-named-as-default
import { UserType } from '@/types';
import { axiosInstance } from './base.api';

const userCreate = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`;
const userCheck = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/check`;
const viewRecommendations = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/recommendations`;

// eslint-disable-next-line import/prefer-default-export
export const UserAPI = {
  login: (data: UserType) => axiosInstance.post(userCreate, data),
  checkUser: (userId: string) => axiosInstance.get(`${userCheck}/${userId}`),
  getUserRecommendations: (id:string) => axiosInstance.get(`${viewRecommendations}/${id}`),
};
