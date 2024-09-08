import { WeatherType } from './WeatherType';

export interface AddressType {
  id: number;
  cep: string;
  logradouro: string;
  complemento: string | null;
  unidade: string | null;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string | null;
  ddd: string;
  siafi: string;
  created_at: string;
  updated_at: string;
  weathers: WeatherType[];
}
