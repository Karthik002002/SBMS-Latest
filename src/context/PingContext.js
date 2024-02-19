import React, { createContext, useContext, useEffect, useState } from 'react';

const PingButton = createContext();

export const usePingButton = () => {
  return useContext(PingButton);
};

export const PingData = ({ children }) => {
  const [Ping, setPing] = useState(null);
  return (
    <PingButton.Provider value={{ Ping, setPing }}>
      {children}
    </PingButton.Provider>
  );
};
