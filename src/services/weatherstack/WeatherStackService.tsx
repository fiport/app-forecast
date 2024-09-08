import axios from '../../api/axios';

function correctName(content: string) {
  return content
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ç/g, 'c')
      .toLowerCase();
}

export const searchWeatherstackForecast = async (city: string) => {
  try {
    city = correctName(city);
    const response = await axios.get(`https://api.weatherstack.com/current?access_key=69a14888b94d0a33a3e3e0e22a56a5bb&query=${city}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar o endereço');
  }
};