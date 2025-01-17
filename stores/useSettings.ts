import type { AddressResponse, AddressData } from "~/types/settings"

export const useSettingsStore = defineStore('settings', () => {

  const allAddresses = ref<AddressData>()


  const fetchAllAddresses = async (): Promise<void> => {
    const { data } = await useAPI<AddressResponse>('/addresses')
    allAddresses.value = data.value?.data
  }

  return {
    allAddresses,
    fetchAllAddresses
  }
})