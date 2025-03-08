import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useAlertStore } from "~/stores/useAlert";
const showPermissionDialog = ref(false);
export function useNotification() {
  const { fetchAllNotifications } = useSettingsStore();
  const { showSuccess } = useAlertStore()
  const { sendFCMToken } = useAuthStore()
  const messaging = ref(null);

  if (process.client) {
    const firebaseApp = useFirebaseApp();
    messaging.value = getMessaging(firebaseApp);
  }
  // const firebaseApp = useFirebaseApp();

  // const messaging = getMessaging(firebaseApp);

  function requestPermission() {
    Notification.requestPermission().then((status) => {
      if (status === "granted") {
        console.log("Notification permission granted.");
        showPermissionDialog.value = false;
      } else {
        console.log("Notification permission denied.");
      }
    });
  }


  // const initializeNotification = (userType: 'technician' | 'customer') => {
  //   messaging.value = getMessaging();
  //   if (Notification.permission !== "granted") {
  //     showPermissionDialog.value = true;
  //   }
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       getToken(messaging.value, {
  //         vapidKey:
  //           "BKKSy8f0S6gQcLJAjcB8k8qQw3hwcxkSAafNmmzCPZyFA8R3-42g8ExHq9KJtG-_F6HPpxSMHYlic3gc7M3j4wg",
  //       })
  //         .then((currentToken) => {
  //           sendFCMToken(
  //             userType,
  //             currentToken
  //           );

  //           onMessage(messaging.value, async (payload) => {
  //             const { notification } = payload;
  //             console.log(payload);

  //             new Notification(notification?.title, {
  //               body: notification?.body,
  //               icon: notification?.icon,
  //             });
  //             showSuccess(notification?.body);
  //             await fetchAllNotifications();
  //           });
  //         })
  //         .catch((err) => {
  //           console.log("An error occurred while retrieving token. ", err);
  //         });
  //     } else {
  //       showPermissionDialog.value = true;
  //       console.log("No permission granted");
  //     }
  //   });
  // }

  const initializeNotification = async (userType: "technician" | "customer") => {
    if (!process.client || !messaging.value) return; // Ensure this runs only in the browser

    try {
      if (Notification.permission !== "granted") {
        showPermissionDialog.value = true;
        await Notification.requestPermission();
      }

      const currentToken = await getToken(messaging.value, {
        vapidKey: "BKKSy8f0S6gQcLJAjcB8k8qQw3hwcxkSAafNmmzCPZyFA8R3-42g8ExHq9KJtG-_F6HPpxSMHYlic3gc7M3j4wg",
      });

      if (currentToken) {
        console.log("FCM Token:", currentToken);
        sendFCMToken(userType, currentToken);
      } else {
        console.error("Failed to retrieve FCM token.");
      }

      onMessage(messaging.value, async (payload) => {
        console.log("Foreground notification received:", payload);

        const { notification } = payload;
        new Notification(notification?.title, {
          body: notification?.body,
          icon: notification?.icon || "/icon.png",
        });

        showSuccess(notification?.body);
        await fetchAllNotifications();
      });
    } catch (error) {
      console.error("Error initializing notifications:", error);
    }
  };

  return {
    initializeNotification,
    showPermissionDialog,
    requestPermission
  };
}