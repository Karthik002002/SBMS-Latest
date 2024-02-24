// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
let UserData = {};
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
const applicationServerKey = urlB64ToUint8Array(
  'BM-hl4OTmVmVuFXEyygr6Y9aP1je7-CP4ANmeIVRHb4sTXBxpxcZVUi28HuZSq3yPWtj55-lMlWV5fahN9_mutc'
);
let options = {
  applicationServerKey,
  userVisibleOnly: true,
  user: UserData?.user_id
};
let subscription;

const saveSubscription = async subscription => {
  // const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  console.log('sw called');
  const SERVER_URL = 'https://sbmsadmin.elenageosys.com/webpush/';
  // const SERVER_URL = "https://elenageosys.com/webpush/";
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${UserData?.token}`
    },
    body: JSON.stringify(subscription)
  });
  return response.json();
};
const SubscribeCall = () => {
  console.log('Subscribe Call');
  self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    console.log('Subscribe Call');
    try {
      // const applicationServerKey = urlB64ToUint8Array(
      //   'BM-hl4OTmVmVuFXEyygr6Y9aP1je7-CP4ANmeIVRHb4sTXBxpxcZVUi28HuZSq3yPWtj55-lMlWV5fahN9_mutc'
      // );
      // const options = {
      //   applicationServerKey,
      //   userVisibleOnly: true,
      //   user: data.user_id
      // };
      // console.log(options);
      // const subscription = await self.registration.pushManager.subscribe(
      //   options
      // );
      const response = await saveSubscription(subscription);
      console.log(JSON.stringify(subscription));
      console.log(response);
    } catch (err) {
      console.log('Error', err);
    }
  });
};

self.addEventListener('message', async event => {
  // This will be called only once when the service worker is activated.
  console.log(event.data);
  UserData = event.data.User;
  SubscribeCall();
  subscription = await self.registration.pushManager.subscribe(options);
});

// self.addEventListener('message', async event => {
//   if (event.data) {
//     try {
//       const applicationServerKey = urlB64ToUint8Array(
//         'BM-hl4OTmVmVuFXEyygr6Y9aP1je7-CP4ANmeIVRHb4sTXBxpxcZVUi28HuZSq3yPWtj55-lMlWV5fahN9_mutc'
//       );
//       const options = {
//         applicationServerKey,
//         userVisibleOnly: true,
//         user: event.data.user_id
//       };
//       const subscription = await self.registration.pushManager.subscribe(
//         options
//       );
//       const response = await saveSubscription(subscription);
//       console.log(JSON.stringify(subscription));
//       console.log(response);
//     } catch (err) {
//       console.log('Error', err);
//     }
//     console.log(event.data);
//   }
// });

self.onmessage = function (event) {
  var data = event.data.User;
  UserData = data;
};

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
