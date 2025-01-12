<script setup lang="ts">
const videoId = ref("JZEU7_36E9I");

const dialog = ref(false);

const isPlaying = ref(false);

const thumbnailUrl = computed(() => {
  return `https://img.youtube.com/vi/${videoId.value}/hqdefault.jpg`;
});

const embedUrl = computed(() => {
  return `https://www.youtube.com/embed/${videoId.value}?autoplay=1`;
});

const playVideo = () => {
  isPlaying.value = true;
};

const showDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  isPlaying.value = false;
};

defineExpose({
  showDialog,
  closeDialog,
});
</script>

<template>
  <v-container>
    <v-dialog max-width="650" v-model="dialog">
      <template #default="{ isActive }">
        <v-card>
          <section>
            <div
              v-if="!isPlaying"
              class="thumbnail-container"
              @click="playVideo"
            >
              <img
                :src="thumbnailUrl"
                :alt="
                  $t(
                    'dashboard.settings.addresses.add_address.instructions.step1'
                  )
                "
                class="thumbnail"
              />
              <v-icon class="play-icon">mdi-play-circle</v-icon>
            </div>

            <iframe
              v-if="isPlaying"
              :src="embedUrl"
              width="100%"
              height="315"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </section>
          <section class="pa-8 d-flex flex-column ga-4">
            <a
              href="https://splonline.com.sa/ar/national-address-1/"
              target="_blank"
              rel="noopener noreferrer"
              class="link text-16 font-weight-500 text-black"
            >
              {{
                $t(
                  "dashboard.settings.addresses.add_address.nationalAddressSteps.step1"
                )
              }}
            </a>
            <p>
              {{
                $t(
                  "dashboard.settings.addresses.add_address.nationalAddressSteps.step2"
                )
              }}
            </p>
            <p>
              {{
                $t(
                  "dashboard.settings.addresses.add_address.nationalAddressSteps.step3"
                )
              }}
            </p>
            <p>
              {{
                $t(
                  "dashboard.settings.addresses.add_address.nationalAddressSteps.step4"
                )
              }}
            </p>
            <p>
              {{
                $t(
                  "dashboard.settings.addresses.add_address.nationalAddressSteps.step5"
                )
              }}
            </p>
          </section>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.thumbnail-container {
  position: relative;
  cursor: pointer;
}

.thumbnail {
  width: 100%;
  border-radius: 8px;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
