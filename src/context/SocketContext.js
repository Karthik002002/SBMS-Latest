import React, { createContext, useContext, useEffect, useState } from 'react';
import { useListFilterContext } from './FilterContext';
import { socketURL } from '../URL/url';

// Create a WebSocket context
const WebSocketContext = createContext();

// Custom hook to access the WebSocket context
export const useWebSocket = () => useContext(WebSocketContext);

// WebSocket provider component
export const WebSocketProvider = ({ children }) => {
  const { setSocketLiveMarker } = useListFilterContext();
  const [socket, setSocket] = useState(null);
  const userData = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  useEffect(() => {
    // Create and establish the WebSocket connection
    const socketConnection = new WebSocket(socketURL);

    // Connection opened
    socketConnection?.addEventListener('open', event => {
      if (userData) {
        const { user_id } = userData;
        console.log('WebSocket connection opened.');
        // Send a message to the server
        socketConnection.send(`user:${user_id}`);
      }
    });
    setSocket(socketConnection);
    const socketKeepAliveCall = setInterval(() => {
      if (socketConnection.readyState === WebSocket.OPEN) {
        socketConnection.send('ping');
      } else {
        console.warn('WebSocket connection is not open yet');
      }
    }, 10 * 1000);

    // Listen for messages from the server
    socketConnection?.addEventListener('message', event => {
      const recievedData = JSON.parse(event.data);
      if (recievedData.content.hasOwnProperty('imei')) {
        setSocketLiveMarker(recievedData.content);
      }
      // setSocketLiveMarker(requiredData);
    });

    // Listen for errors
    socketConnection?.addEventListener('error', event => {
      console.error('WebSocket error:', event);
    });

    // Connection closed
    socketConnection?.addEventListener('close', event => {
      console.log('WebSocket connection closed:', event);
    });

    return () => {
      clearInterval(socketKeepAliveCall);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
