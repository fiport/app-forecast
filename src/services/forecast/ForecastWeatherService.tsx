import axios from '../../api/axios';

const path  = 'weather';

export const deleteWeather = async (id: number | null) => {
  try {
    return await axios.delete(`${path}/delete/${id}`);
  } catch (error) {
    throw new Error('Falha ao remover registro!');
  }
};
