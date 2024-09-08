import React, { useState, useEffect } from 'react';
import {Typography} from '@mui/material';
import CustomProgressLoading from "../../components/progress/CustomProgress";
import CustomContentList from "../../components/content-list/CustomContentList";
import {getAddressWeatherList} from "../../services/forecast/ForecastService";

const Forecast: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getList = () => {
      setLoading(true);

      getAddressWeatherList()
          .then(res => {
            setData(res);
            setLoading(false);
          })
          .catch(() => setLoading(false));
    }

    getList();
  }, []);

  return (
      <div>
        {loading ? (
            <CustomProgressLoading size={100} />
        ) : (
            <CustomContentList initialList={data} />
        )}
      </div>
  );
};

export default Forecast;
