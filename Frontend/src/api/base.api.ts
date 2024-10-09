import axios from 'axios';

export const oauthAxiosInstance = axios.create();

// Función para obtener el token de acceso
// eslint-disable-next-line no-unused-vars
const getToken = async () => {
  const options = {
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token` || '',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'oH9wwHkRdat7iQ0FjXS8900FYmR8Mdgz',
      client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET || '',
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || '',
    }),
  };
  const response = await oauthAxiosInstance(options);
  return response.data.access_token;
};

export const axiosInstance = axios.create();

// Interceptor para agregar el token de autorización a las solicitudes
axiosInstance.interceptors.request.use(async (config) => {
  // eslint-disable-next-line no-param-reassign
  // config.headers.Authorization = `Bearer ${await getToken()}`;
  // eslint-disable-next-line no-param-reassign
  config.headers['Content-Type'] = 'application/json';
  return config;
}, (error) => Promise.reject(error));
