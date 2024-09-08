import axios from '../../api/axios';

export const searchAddressForCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar o endereço');
  }
};
