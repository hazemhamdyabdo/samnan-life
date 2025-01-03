<script setup >
import { defineAsyncComponent,ref, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default:'lg',
  },
  color: {
    type: String,
  },
  hoverColor: {
    type: String,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
})

const hovering = ref(false)

const componentStyle = computed(() => ({
  display: 'block',
  cursor: props.readOnly? 'not-allowed' : 'pointer',
}))

const dynamicComponent = defineAsyncComponent(
    () => import(`~/assets/icons/${props.name}.svg`)
)
</script>

<template>
  <component
      :is="dynamicComponent"
      :style="componentStyle"
      filled
      :fontControlled="false"
      @mouseover="hovering = true"
      @mouseleave="hovering = false"
  />
</template>
