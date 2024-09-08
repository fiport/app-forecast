import axios from '../../api/axios';

const path  = 'addressWeather';

export const getAddressWeatherList = async () => {
  try {
    const request = await axios.get(`${path}/list`);

    return request.data;
  } catch (error) {
    throw new Error('Falha ao listar dados!');
  }
};

export const createAddressWeather = async (data: any) => {
  try {
    return await axios.post(`${path}/create`, data);
  } catch (error) {
    throw new Error('Falha ao cadastrar consulta!');
  }
};

export const deleteAddressWeather = async (data: any) => {
  try {
    return await axios.post(`${path}/delete`, data);
  } catch (error) {
    throw new Error('Falha ao remover registro!');
  }
};