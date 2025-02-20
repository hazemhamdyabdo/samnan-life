<script setup lang="ts">
import { ref } from "vue";

withDefaults(
  defineProps<{
    latLng: any;
  }>(),
  {
    latLng: [24.7136, 46.6753],
  }
);
const emits = defineEmits<{
  (e: "update:latLng", value: any): void;
}>();

const zoom = ref(6);

function onDragEnd(event: any) {
  emits("update:latLng", event);
}
</script>

<template>
  <div style="height: 350px; width: 100%">
    <LMap ref="map" :zoom="zoom" :center="latLng" :use-global-leaflet="false">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker :lat-lng="latLng" draggable @update:latLng="onDragEnd" />
    </LMap>
  </div>
</template>
