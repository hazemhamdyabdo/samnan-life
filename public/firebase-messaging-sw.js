// static/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAgkmRC_fhpfYDWfgCzFVqMmwfHxk3KYLk",
  authDomain: "smnapp-20ba2.firebaseapp.com",
  projectId: "smnapp-20ba2",
  storageBucket: "smnapp-20ba2.appspot.com",
  messagingSenderId: "472930512394",
  appId: "1:472930512394:web:df9b8776a1baa6cc1af9f3",
  measurementId: "G-CBJDRFVCLD",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
