import type { TechnicianResponse, Product, District } from "@/types/technician"
export const useTechnicianStore = defineStore('technician', (): {
  chartDataAllRequests: Ref<Record<string, any>>;
  chartDataCompletedRequests: Ref<Record<string, any>>;
  coverDistricts: Ref<District[] | undefined>;
  technicianProducts: Ref<Product[] | undefined>;
  getTechnicianData: () => Promise<void>;
} => {
  const chartDataAllRequests = ref({})
  const chartDataCompletedRequests = ref({})
  const coverDistricts = ref<District[]>()
  const technicianProducts = ref<Product[]>()


  const getTechnicianData = async () => {
    const { data } = await useAPI<TechnicianResponse>(`/technician`)
    technicianProducts.value = data.value?.data.technician.products
    coverDistricts.value = data.value?.data.technician.districts
    chartDataAllRequests.value = {
      allRequests: data.value?.data.total_requests,
      typeOfRequests: data.value?.data.requests_by_type,
    }
    chartDataCompletedRequests.value = {
      completedRequests: data.value?.data.completed_requests,
      ongoingRequests: data.value?.data.ongoing_requests,
      allRequests: data.value?.data.total_requests,
    }
  }

  return {
    chartDataAllRequests,
    chartDataCompletedRequests,
    coverDistricts,
    technicianProducts,
    getTechnicianData,
  }
});