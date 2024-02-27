import React, { useContext, useEffect } from 'react';
import { TileLayer, useMap } from 'react-leaflet';
import AppContext from 'context/Context';
import 'leaflet.tilelayer.colorfilter';
const TileLayerWithFilter = () => {
  const map = useMap();
  const { config } = useContext(AppContext);
  const { isDark } = config;
  const filter = isDark

  useEffect(() => {
    if (map) {
      const filter = isDark
        ? [
            'invert:85%',
            'grayscale:39%',
            'bright:99%',
            'contrast:121%',
            'hue:203deg',
            'saturate:1000%'
          ]
        : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%'];

      L.tileLayer
        .colorFilter(
          'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
          {
            attribution: null,
            transparent: true,
            filter: filter
          }
        )
        .addTo(map);
    }
  }, [isDark, map]);

  return null; // We don't need to render anything directly for the TileLayer
};

export default TileLayerWithFilter;
