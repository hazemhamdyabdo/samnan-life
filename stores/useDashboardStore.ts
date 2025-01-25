import type { ApiResponse, Slider, LandingData } from "~/types/settings";

export const useDashboardStore = defineStore("dashboard", () => {
  const landingContent = ref<LandingData>();

  const fetchSlides = (): any => {
    return useAPI<{ data: { value: ApiResponse<Slider[]> } }>("/sliders");
  };

  const fetchLandingContent = async () => {
    const { data, error } = await useAPI<ApiResponse<LandingData>>("/landing", {
      headers: {
        "Accept-Language": "ar",
      },
    });
    landingContent.value = data.value?.data;
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  return { fetchSlides, landingContent, fetchLandingContent };
});
