import type { AddressResponse, AddressData, Address, City, CitiesResponse, District, DistrictsResponse } from "~/types/settings"

export const useSettingsStore = defineStore('settings', () => {

  const allAddresses = ref<AddressData>()
  const allCities = ref<City[]>()
  const districts = ref<District[]>()

  const fetchAllAddresses = async (): Promise<void> => {
    const { data } = await useAPI<AddressResponse>('/addresses')
    allAddresses.value = data.value?.data
  }

  const fetchAllCities = async (): Promise<void> => {
    const { data } = await useAPI<CitiesResponse>('/cities')
    allCities.value = data.value?.data
  }

  const fetchAllDistricts = async (cityId: number): Promise<void> => {
    const { data } = await useAPI<DistrictsResponse>(`/cities/${cityId}/districts`)
    districts.value = data.value?.data
  }

  const createAddress = async (address: Address): Promise<void> => {
    const { error } = await useAPI<AddressResponse>('/addresses', {
      method: 'POST',
      body: address,
      watch: false
    })
    if (error.value) {
      throw new Error(error.value.message)
    }
  }

  const deleteAddress = async (id: number): Promise<void> => {
    const { error } = await useAPI<AddressResponse>(`/addresses/${id}`, {
      method: 'DELETE',
      watch: false
    })
    if (error.value) {
      throw new Error(error.value.message)
    }
  }


  const getSingleAddress = async (id: number): Promise<AddressData | undefined> => {
    const { data } = await useAPI<AddressResponse>(`/addresses/${id}`)
    return data.value?.data
  }

  const updateAddress = async (address: Address): Promise<void> => {
    const { error } = await useAPI<AddressResponse>(`/addresses/${address.id}`, {
      method: 'PUT',
      body: address,
      watch: false
    })
    if (error.value) {
      throw new Error(error.value.message)
    }
  }

  return {
    allAddresses,
    fetchAllAddresses,
    allCities,
    fetchAllCities,
    districts,
    fetchAllDistricts,
    createAddress,
    deleteAddress,
    getSingleAddress,
    updateAddress
  }
})