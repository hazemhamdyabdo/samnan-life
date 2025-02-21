<template>
  <Html :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" translate="no">
    <Head>
      <Meta name="google" content="notranslate" />
    </Head>

    <NuxtLayout @contextmenu="preventContextMenu">
      <Snackbar />
      <NuxtLoadingIndicator />
      <NuxtPage />

      <div v-if="showPermissionDialog" class="custom-dialog">
        <v-sheet width="650" class="pa-4" rounded="lg">
          <v-btn
            icon="mdi-window-close"
            variant="text"
            @click="showPermissionDialog = false"
          />

          <div class="text-center">
            <v-img
              class="mx-auto mb-4"
              src="~/assets/images/icons/success.svg"
              alt="success"
              width="70"
            />

            <p class="font-22-bold text-capitalize text-wrap mb-4">
              {{ $t("notifications_permission") }}
            </p>

            <v-btn
              variant="elevated"
              size="large"
              color="main"
              block
              rounded="lg"
              @click="requestPermission"
            >
              {{ $t("allow") }}
            </v-btn>
          </div>
        </v-sheet>
      </div>
    </NuxtLayout>
  </Html>
</template>

<script lang="ts" setup>
import { setLocale } from "yup";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useSnackbarStore } from "~/store/snackbarStore";
import { useNotificationStore } from "~/store/notificationStore";

const { t } = useI18n();
const notificationStore = useNotificationStore();
const { addNotification } = notificationStore;
const messaging = ref();
const showPermissionDialog = ref(false);
const snackbarStore = useSnackbarStore();

function isSupportedBrowser() {
  return (
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    navigator.userAgent.includes("Mac") === false
  );
}

if (isSupportedBrowser()) {
  messaging.value = getMessaging();

  if (Notification.permission !== "granted") {
    showPermissionDialog.value = true;
  }

  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        getToken(messaging.value, {
          vapidKey:
            "BJnRgrdp1r8e9RTIl2z13QqUkmupcg5JBWEOhnrp-NL_ulYlVUcymJsocA24kzfsOk0BW9EcgoneJBRhNcy9tCU",
        })
          .then(async (res) => {
            if (authData.value) {
              await useFetchApi("profile/update-notification-token", {
                method: "POST",
                body: {
                  token: res,
                },
              });
            }

            onMessage(messaging.value, (payload) => {
              snackbarStore.fireSnack({
                show: true,
                text: payload?.notification?.body?.slice(0, 50) + "...",
                location: "top end",
              });

              addNotification();

              playSound();
            });
          })
          .catch((error) => {
            console.log("get token error:", error);
          });
      }
    })
    .catch((error) => {
      console.log("Notification.requestPermission error:", error);
    });
} else {
  console.log("Firebase Messaging is not supported on this browser.");
}

function preventContextMenu(event: MouseEvent) {
  event.preventDefault();
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "F12" || event.keyCode === 123) {
    event.preventDefault();
  }
};

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

function playSound() {
  let audio = new Audio("/notification.wav");
  audio.loop = false;
  audio?.play();
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style lang="scss" scoped>
.custom-dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: -1;
  }
}
</style>
