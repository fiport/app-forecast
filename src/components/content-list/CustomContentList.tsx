import React, { useState } from 'react';
import {
  Avatar,
  Card,
  IconButton,
  ListItemAvatar,
  Pagination,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAvatar from '../avatar/CustomAvatar';
import PlaceIcon from '@mui/icons-material/Place';
import ListItemText from '@mui/material/ListItemText';
import NoContent from '../NoContent';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import theme from '../../Theme';
import { useModal } from '../../contexts/modal/ModalContext';
import ForecastForm from "../../pages/forecast/form/ForecastForm";
import { AddressType } from "../../types/AddressType";
import { formatDateTime } from "../../helpers/DateFormatter";
import { deleteAddress } from '../../services/forecast/ForecastAddressService';
import { searchAddressForCep } from '../../services/viacep/ViaCepService';
import { searchWeatherstackForecast } from '../../services/weatherstack/WeatherStackService';
import {deleteWeather} from "../../services/forecast/ForecastWeatherService";

interface CustomListProps {
  initialList: {
    data: AddressType[],
    per_page: number,
    total: number,
    last_page: number;
    current_page: number;
  };
}

const CustomContentList: React.FC<CustomListProps> = ({ initialList }) => {
  const { openModal, closeModal } = useModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWeatherId, setSelectedWeatherId] = useState<number | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<any>(null);
  const [comparisonCep, setComparisonCep] = useState('');
  const [comparisonWeather, setComparisonWeather] = useState<any>(null);
  const [comparisonDialogOpen, setComparisonDialogOpen] = useState(false);
  const [temperatureDifference, setTemperatureDifference] = useState<string | null>(null);
  const [page, setPage] = useState(initialList.current_page);
  const [list, setList] = useState(initialList);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<string>('');
  const [snackBarMessage, setsnackBarMessage] = useState<string>('');
  const [showSnackBar, setshowSnackBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para busca

  const fetchData = async (pageNumber: number) => {
    try {
      const response = await fetch(`http://local.api.realtime.com.br/api/v1/addressWeather/list${page ? `?page=${pageNumber}` : ``}`);
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchData(value);
  };

  const handleCloseModal = () => {
    fetchData(page);
    closeModal();
  };

  const handleOpenModal = () => {
    openModal(
        <ForecastForm onClose={handleCloseModal} />
    );
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, weatherId: number, weather: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedWeatherId(weatherId);
    setSelectedWeather(weather);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedWeatherId(null);
  };

  const handleCompare = () => {
    setComparisonDialogOpen(true);
    handleMenuClose();
  };

  const handleComparisonClose = () => {
    setComparisonDialogOpen(false);
    setComparisonCep('');
    setComparisonWeather(null);
    setTemperatureDifference(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Função para filtrar os itens da lista com base no CEP ou na cidade
  const filteredList = list.data?.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
        item.cep.includes(searchQuery) ||
        item.localidade.toLowerCase().includes(searchLower)
    );
  });

  const handleCompareSubmit = async () => {
    if (comparisonCep.length === 8) {
      try {
        const addressData = await searchAddressForCep(comparisonCep);
        if (addressData.erro === 'true') {
          alert('CEP não encontrado');
          return;
        }

        const weatherData = await searchWeatherstackForecast(`${addressData.localidade}`);
        if (weatherData.error) {
          alert('Erro ao buscar dados de previsão do tempo');
          return;
        }
        setComparisonWeather(weatherData);

        // Calcular a diferença de temperatura
        const tempDiff = weatherData.current.temperature - selectedWeather.weather_current.temperature;
        const diffMessage = tempDiff > 0
            ? `${weatherData.location.name} está ${tempDiff}º mais quente que ${selectedWeather.name}`
            : `${weatherData.location.name} está ${Math.abs(tempDiff)}º mais fria que ${selectedWeather.name}`;
        setTemperatureDifference(diffMessage);
      } catch (error) {
        alert('Erro ao buscar dados do CEP');
      }
    } else {
      alert('Informe um CEP válido de 8 dígitos');
    }
  };

  const handleDeleteWeather = () => {
    setDeleteType('deleteWeather');
    setSelectedItemToDelete(selectedWeatherId);
    setOpenDialog(true);
  };

  const handleDeleteAddress = (addressId: number) => {
    setDeleteType('deleteAddress');
    setSelectedItemToDelete(addressId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    const action = deleteType === 'deleteWeather' ? deleteWeather : deleteAddress;

    action(selectedItemToDelete)
        .then((res: any) => {
          handleMenuClose();

          setsnackBarMessage(res.data.message);
          setshowSnackBar(true);

          setOpenDialog(false);

          fetchData(page);
        });

    setOpenDialog(false);
  };

  return (
      <>
        <Snackbar
            open={showSnackBar}
            autoHideDuration={6000}
            onClose={() => setshowSnackBar(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <SnackbarContent
              message={snackBarMessage}
              sx={{ backgroundColor: theme.palette.primary.main }}
          />
        </Snackbar>

        <TextField
            label="Digite para buscar..."
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
        />

        <Card variant="outlined" sx={{ mb: 5, minHeight: 350, overflow: 'auto' }}>
          <List dense={true}>
            {filteredList?.length ? filteredList.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem
                      secondaryAction={
                        <IconButton onClick={() => handleDeleteAddress(item.id)} edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      }
                  >
                    <ListItemAvatar>
                      <CustomAvatar>
                        <PlaceIcon />
                      </CustomAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${item.logradouro}, ${item.localidade} - ${item.uf}`}
                        secondary={`CEP: ${item.cep}`}
                    />
                  </ListItem>

                  {item.weathers.length > 0 && (
                      <List sx={{ pl: 4 }}>
                        {item.weathers.map((weather) => (
                            <React.Fragment key={weather.id}>
                              <ListItem>
                                <ListItemText
                                    primary={`${weather.name}, ${weather.region} - ${weather.country}`}
                                    secondary={`${weather.weather_current.temperature}º - ${formatDateTime(weather.localtime)}`}
                                />

                                <IconButton
                                    aria-label="options"
                                    onClick={(event) => handleMenuClick(event, weather.id, weather)}
                                >
                                  <MoreVertIcon />
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl && selectedWeatherId === weather.id)}
                                    onClose={handleMenuClose}
                                >
                                  <MenuItem onClick={handleCompare}>Comparar</MenuItem>
                                  <MenuItem onClick={handleDeleteWeather}>Excluir</MenuItem>
                                </Menu>
                              </ListItem>
                              <Divider style={{ margin: 5 }} />
                            </React.Fragment>
                        ))}
                      </List>
                  )}

                  <Divider style={{ margin: 5 }} />
                </React.Fragment>
            )) : <NoContent onClick={() => {}} />}
          </List>
        </Card>

        {list.data?.length ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Pagination
                  count={list.last_page}
                  page={list.current_page}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
              />
            </div>
        ) : (<></>)
        }

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000
          }}>
            <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: theme.palette.primary.main,
                }}
                onClick={handleOpenModal}
            >
              <IconButton
                  sx={{ color: 'white' }}
                  aria-label="add"
              >
                <AddIcon />
              </IconButton>
            </Avatar>
          </div>
        </div>

        {/* Modal de comparação */}
        <Dialog open={comparisonDialogOpen} onClose={handleComparisonClose}>
          <DialogTitle>Comparar Temperaturas</DialogTitle>
          <DialogContent>
            <Typography mb={2}>
              Temperatura registrada em: {selectedWeather?.name}, {selectedWeather?.region} {formatDateTime(selectedWeather?.localtime)} - {selectedWeather?.weather_current.temperature}cº
            </Typography>
            <TextField
                label="CEP para comparação"
                value={comparisonCep}
                onChange={(e) => setComparisonCep(e.target.value)}
                fullWidth
            />
            {comparisonWeather && (
                <>
                  <Typography style={{ marginTop: 10 }}>
                    Temperatura registrada em: {comparisonWeather.location.name}, {comparisonWeather.location.region} {formatDateTime(comparisonWeather.location.localtime)} - {comparisonWeather.current.temperature}cº
                  </Typography>
                  {temperatureDifference && (
                      <Typography style={{ marginTop: 10, fontWeight: 'bold' }}>
                        {temperatureDifference}
                      </Typography>
                  )}
                </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleComparisonClose}>Cancelar</Button>
            <Button onClick={handleCompareSubmit}>Comparar</Button>
          </DialogActions>
        </Dialog>

        <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmar Exclusão"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você tem certeza que deseja excluir esta consulta?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={confirmDelete} color="primary" autoFocus>
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default CustomContentList;
