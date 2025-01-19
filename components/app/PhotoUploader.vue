<template>
  <label
    class="uploader border d-block border-dashed radius-16 pa-5"
    for="file"
  >
    <div class="d-flex justify-center align-center h-100">
      <div v-show="images.length == 0">
        <input
          type="file"
          id="file"
          class="d-none"
          accept="image/*"
          multiple
          @change="onFileChange"
        />
        <AppSvgIcon name="upload"> </AppSvgIcon>
      </div>
      <div v-show="images.length" class="d-flex ga-2">
        <v-img
          color="primary"
          v-for="image in images"
          :key="image"
          :src="image"
          alt="image"
          width="100"
          height="100"
          cover
          rounded="lg"
        />
      </div>
    </div>
  </label>
</template>

<script setup>
const emit = defineEmits(["upload"]);
const images = ref([]);
const onFileChange = (e) => {
  const files = e.target.files;
  emit("upload", files);
  if (files.length) {
    //preview images
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        images.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="scss" scoped>
.uploader {
  height: 152px;
}
</style>
