import { getMessaging, getToken } from "firebase/messaging";

const showPermissionDialog = ref(false);
export function useNotification() {
  const { sendFCMToken } = useAuthStore()
  const messaging = ref();


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


  const initializeNotification = (userType: 'technician' | 'customer') => {
    messaging.value = getMessaging();
    if (Notification.permission !== "granted") {
      showPermissionDialog.value = true;
    }
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging.value, {
          vapidKey:
            "BKKSy8f0S6gQcLJAjcB8k8qQw3hwcxkSAafNmmzCPZyFA8R3-42g8ExHq9KJtG-_F6HPpxSMHYlic3gc7M3j4wg",
        })
          .then((currentToken) => {
            sendFCMToken(
              userType,
              currentToken
            );
            // console.log(currentToken);
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      } else {
        showPermissionDialog.value = true;
        console.log("No permission granted");
      }
    });
  }

  return {
    initializeNotification,
    showPermissionDialog,
    requestPermission
  };
}