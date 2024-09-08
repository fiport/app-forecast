import axios from '../../api/axios';

const path  = 'address';

export const deleteAddress = async (id: number | null) => {
  try {
    return await axios.delete(`${path}/delete/${id}`);
  } catch (error) {
    throw new Error('Falha ao remover registro!');
  }
};