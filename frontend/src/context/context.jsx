import React from 'react';
import { createContext, useState, useEffect } from 'react';

const regContext = createContext();

export const ContextProvider = ({ children }) => {
  const [fruits_data, setFruitsData] = useState([]);
  const [brands_data, setBrandsData] = useState([]);

  const getFruits = async () => {
    try {
      const response = await fetch('http://localhost:5000/routes/fruit_dash', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();
      setFruitsData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBrandGoods = async () => {
    try {
      const response = await fetch('http://localhost:5000/routes/brand_dash', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();
      setBrandsData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <regContext.Provider
      value={{ fruits_data, getFruits, brands_data, getBrandGoods }}
    >
      {children}
    </regContext.Provider>
  );
};

export default regContext;
