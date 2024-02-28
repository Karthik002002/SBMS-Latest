import { PushNotificationURL } from '../URL/url';
import React, { useEffect } from 'react';

function PushNotificationHandling() {
  //function to check the the sessionStorage data is avaliable or not
  //If not wait until it have the sessionStorage data
  function getSessionData(key) {
    return new Promise((resolve, reject) => {
      const data = sessionStorage.getItem(key);
      if (data !== null) {
        resolve(JSON.parse(data)); // Resolve immediately if data is available
      } else {
        const checkDataInterval = setInterval(() => {
          const newData = sessionStorage.getItem(key);
          if (newData !== null) {
            clearInterval(checkDataInterval);
            resolve(JSON.parse(newData));
          }
        }, 500); // Check every 500 milliseconds
      }
    });
  }

  const saveSubscription = async subscription => {
    console.log('Push API called');
    const sessionData = await getSessionData('loggedInUser');
    const { user_id, token } = sessionData;
    const parsedSubscription = JSON.parse(subscription);
    const FinalData = { ...parsedSubscription, user_id: user_id };
    const response = await fetch(PushNotificationURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(FinalData)
    });
    return response.json();
  };

  useEffect(() => {
    const handleMessageFromServiceWorker = event => {
      // Call the function to send data to the API
      const data = JSON.parse(event);
      console.log(typeof data);
    };

    // Add event listener to listen for messages from the service worker
    navigator.serviceWorker?.addEventListener('message', event => {
      if (event.data && event.data.subscriptionMessage) {
        event.source.postMessage({ confirmation: true });
        saveSubscription(event.data.subscriptionMessage);
      }
    });
    // Clean up the event listener when the component unmounts
    return () => {
      navigator.serviceWorker?.removeEventListener(
        'message',
        handleMessageFromServiceWorker
      );
    };
  }, []);
  return null;
}

export default PushNotificationHandling;
