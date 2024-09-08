import { Button, Card, CardContent, Grid2, TextField, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import CustomProgressLoading from "../../../components/progress/CustomProgress";
import { searchAddressForCep } from "../../../services/viacep/ViaCepService";
import { searchWeatherstackForecast } from "../../../services/weatherstack/WeatherStackService";
import { styled } from "@mui/material/styles";
import { createAddressWeather } from "../../../services/forecast/ForecastService";
import {AddressType} from "../../../types/AddressType";

interface ForecastFormProps {
  onClose: () => void;
}

const ForecastForm: React.FC<ForecastFormProps> = ({ onClose }) => {
  const Image = styled('img')(({ theme }) => ({
    height: 80,
    width: 80,
    margin: 10,
    borderRadius: 5,
  }));

  const [cep, setCep] = useState<string>('');
  const [address, setAddress] = useState<AddressType>();
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>(''); // Estado para armazenar erros
  const [loading, setLoading] = useState<boolean>(false);

  const handleCepChange = async () => {
    if (cep.length === 8) {
      setLoading(true);
      try {
        const addressData = await searchAddressForCep(cep);
        if (addressData.erro === 'true') {
          setError('Não foi possível obter o conteúdo.');
          return;
        }
        setAddress(addressData);

        const weatherData = await searchWeatherstackForecast(`${addressData.localidade}`);
        if (weatherData.error) {
          setError('Não foi possível obter o conteúdo.');
          return;
        }

        setWeather(weatherData);
      } catch (err) {
        setError('Não foi possível obter o conteúdo.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('CEP deve conter 8 dígitos.');
    }
  };

  const handleSave = () => {
    setLoading(true);
    const allData = {
      address: address,
      weather: weather,
    };

    createAddressWeather(allData)
        .then(() => {
          setLoading(false);
          onClose();
        })
        .catch(() => {
          setError('Não foi possível salvar os dados.');
          setLoading(false);
        });
  };

  return (
      <>
        {loading ? (
            <CustomProgressLoading size={25} />
        ) : (
            <>
              <Typography variant="h6">Nova consulta</Typography>

              {error && (
                  <Alert severity="error" onClose={() => setError('')}>
                    {error}
                  </Alert>
              )}

              <Card variant="outlined">
                <Grid2 container spacing={2} p={2}>
                  <Grid2 size={12}>
                    <TextField
                        placeholder="Informe o CEP para iniciar a consulta..."
                        variant="standard"
                        type="number"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        fullWidth
                    />
                  </Grid2>
                </Grid2>
              </Card>

              {address && (
                  <Card variant="outlined" style={{ marginTop: 20 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        Informações do endereço
                      </Typography>
                      <Grid2 container spacing={2} p={2}>
                        <Grid2 size={4}>
                          <TextField placeholder="Rua" value={address.logradouro} variant="standard" disabled fullWidth />
                        </Grid2>
                        <Grid2 size={4}>
                          <TextField placeholder="Cidade" value={address.localidade} variant="standard" disabled fullWidth />
                        </Grid2>
                        <Grid2 size={4}>
                          <TextField placeholder="Estado" value={address.estado} variant="standard" disabled fullWidth />
                        </Grid2>
                        <Grid2 size={4}>
                          <TextField placeholder="Bairro" value={address.bairro} variant="standard" disabled fullWidth />
                        </Grid2>
                      </Grid2>
                    </CardContent>
                  </Card>
              )}

              {weather && (
                  <Card variant="outlined" style={{ marginTop: 20 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        Informações do tempo para {`${address?.localidade} - ${address?.uf}`}
                      </Typography>
                      <Grid2 container spacing={2} p={2}>
                        <Grid2 size={12}>
                          <Card variant="outlined" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <Image src={weather.current.weather_icons[0]} alt="No Content" />
                            <div>
                              <Typography>Temperatura: {weather.current.temperature}º</Typography>
                              <Typography>Vento: {weather.current.wind_speed} Km/h - Sentido: {weather.current.wind_dir}</Typography>
                              <Typography>Umidade: {weather.current.humidity}%</Typography>
                            </div>
                          </Card>
                          <div style={{ textAlign: 'right' }}>
                            <Typography style={{ fontSize: 10 }}>
                              Consulta realizada em: {weather.location.localtime} - Horário local
                            </Typography>
                          </div>
                        </Grid2>
                      </Grid2>
                    </CardContent>
                  </Card>
              )}

              <div style={{ display: 'flex', justifyContent: 'end', marginTop: 20 }}>
                {!weather && !address ? (
                    <Button variant="contained" disabled={loading} onClick={handleCepChange}>
                      {loading ? 'Buscando' : 'Buscar'}
                    </Button>
                ) : (
                    <Button variant="contained" disabled={loading} onClick={handleSave}>
                      {loading ? 'Salvando' : 'Salvar'}
                    </Button>
                )}
              </div>
            </>
        )}
      </>
  );
};

export default ForecastForm;
