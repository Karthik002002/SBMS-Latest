// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}; // saveSubscription saves the subscription to the backend

self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  try {
    const applicationServerKey = urlB64ToUint8Array(
      'BM-hl4OTmVmVuFXEyygr6Y9aP1je7-CP4ANmeIVRHb4sTXBxpxcZVUi28HuZSq3yPWtj55-lMlWV5fahN9_mutc'
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    // const response = await saveSubscription(subscription);
    let sendMessageInterval;

    // Listen for messages from the main application
    self.addEventListener('message', event => {
      if (event.data && event.data.confirmation) {
        // If client confirms received message, resume sending
        clearInterval(sendMessageInterval);
      }
    });
    // Start sending messages initially
    sendMessageInterval = setInterval(() => {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            subscriptionMessage: JSON.stringify(subscription)
          });
        });
      });
    }, 10000);
    console.log(JSON.stringify(subscription));
    // console.log(response);
  } catch (err) {
    console.log('Error', err);
  }
});

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
    icon: 'logo.png',
    data: {
      url: 'https://sbmsadmin.elenageosys.com/webpush/'
    }
    // here you can add more properties like icon, image, vibrate, etc.
  };
  // swRegistration.showNotification(title, options);

  swRegistration.showNotification(title, options);
};

self.addEventListener('push', function (event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text());
    showLocalNotification(
      'Elena Geo Systems',
      event.data.text(),
      self.registration
    );
  } else {
    console.log('Push event but no data');
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://sbmsadmin.elenageosys.com/webpush/')
  );
});
