import type { ApiResponse, Slider, LandingData } from "~/types/settings";

export const useDashboardStore = defineStore("dashboard", () => {
  const slides = ref<Slider[]>()
  const landingContent = ref<LandingData>()

  const fetchSlides = async () => {
    const { data, error } = await useAPI<ApiResponse<Slider[]>>('/sliders')
    slides.value = data.value?.data
    if (error.value) {
      throw new Error(error.value.message)
    }
  }

  const fetchLandingContent = async () => {
    const { data, error } = await useAPI<ApiResponse<LandingData>>('/landing', {
      headers: {
        'Accept-Language': 'ar'
      }
    })
    landingContent.value = data.value?.data
    console.log('====================================');
    console.log(data.value?.data);
    console.log('====================================');
    if (error.value) {
      throw new Error(error.value.message)
    }
  }

  return { slides, fetchSlides, landingContent, fetchLandingContent }
});