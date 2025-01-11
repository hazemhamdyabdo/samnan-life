<script setup lang="ts">
import { defineAsyncComponent, ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: "sm" | "md" | "lg" | "xl" | number;
    color?: string;
    readOnly?: boolean;
    filled?: boolean;
  }>(),
  {
    size: "sm",
    readOnly: false,
    filled: true,
  }
);
const sizeMap: Record<string, number> = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
};
const componentStyle = computed(() => {
  const sizeValue =
    typeof props.size === "string" ? sizeMap[props.size] : props.size;
  const dimension = sizeValue ?? sizeMap.md;

  return {
    display: "block",
    cursor: props.readOnly ? "not-allowed" : "pointer",
    width: `${dimension}px`,
    height: `${dimension}px`,
  };
});

const dynamicComponent = defineAsyncComponent(
  () => import(`~/public/icons/${props.name}.svg`)
);
</script>

<template>
  <component
    :is="dynamicComponent"
    :style="componentStyle"
    :filled
    :size="'lg'"
    :fontControlled="false"
  />
</template>
