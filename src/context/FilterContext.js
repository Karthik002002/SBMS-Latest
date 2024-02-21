import React, { createContext, useContext, useEffect, useState } from 'react';

const ListDashboardData = createContext();

export const useListFilterContext = () => {
  return useContext(ListDashboardData);
};

export const FilterData = ({ children }) => {
  const [Filter, setFilter] = useState(null);
  const [companyFilter, setCompanyFilter] = useState(null);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  //for map and live tracking
  const [ActiveVehicle, setActiveVehicle] = useState(null);
  const [TrackingVehicleCenter, setTrackingVehicleCenter] = useState([
    13.422925089909123, 77.9857877043398
  ]);
  const [ZoomLevel, setZoomLevel] = useState(6);
  //for table
  const [PageCount, setPageCount] = useState(null);
  //Live Tracking IMEI for the tracking page
  const [IMEI, setIMEI] = useState(null);
  //State for historyTracking is Active or not for the tracking page
  const [HistoryTrackingActive, setHistoryTrackingActive] = useState(false);
  const [HistoryTrackingURL, setHistoryTrackingURL] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      //setting the page count according to the screen height
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setScreenSize({ width: newWidth, height: newHeight });
      if (newHeight > 1000 && newHeight <= 1449) {
        setPageCount(30);
      } else if (newHeight > 1450 && newHeight < 1700) {
        setPageCount(40);
      } else if (newHeight >= 1700) {
        setPageCount(50);
      } else {
        setPageCount(20);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(HistoryTrackingURL, HistoryTrackingActive);
  }, [HistoryTrackingURL, HistoryTrackingActive]);

  return (
    <ListDashboardData.Provider
      value={{
        Filter,
        setFilter,
        screenSize,
        PageCount,
        ActiveVehicle,
        setActiveVehicle,
        companyFilter,
        setCompanyFilter,
        TrackingVehicleCenter,
        setTrackingVehicleCenter,
        ZoomLevel,
        setZoomLevel,
        IMEI,
        setIMEI,
        HistoryTrackingActive,
        setHistoryTrackingActive,
        HistoryTrackingURL,
        setHistoryTrackingURL
      }}
    >
      {children}
    </ListDashboardData.Provider>
  );
};
