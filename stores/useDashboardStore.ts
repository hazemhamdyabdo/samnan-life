import type { ApiResponse, Slider } from "~/types/settings";

export const useDashboardStore = defineStore("dashboard", () => {
  const slides = ref<Slider>()

  const fetchSlides = async () => {
    const { data, error } = await useAPI<ApiResponse<Slider>>('/sliders')
    slides.value = data.value?.data
    if (error.value) {
      throw new Error(error.value.message)
    }
  }

  return { slides, fetchSlides }
});