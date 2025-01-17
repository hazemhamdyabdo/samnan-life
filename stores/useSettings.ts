import type { AddressResponse, AddressData, Address, City, CitiesResponse, District, DistrictsResponse, Product, ProductResponse } from "~/types/settings"

export const useSettingsStore = defineStore('settings', () => {
  // addresses apis
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


  // Products apis 
  const allProducts = ref<Product[]>()
  const customerProducts = ref<Product[]>()

  const fetchAllProducts = async (): Promise<void> => {
    const { data } = await useAPI<ProductResponse>('/products')
    allProducts.value = data.value?.data
  }


  const fetchCustomerProducts = async (): Promise<void> => {
    const { data } = await useAPI<ProductResponse>('/customer/products')
    customerProducts.value = data.value?.data
  }

  const deleteProduct = async (id: number): Promise<void> => {
    const { error } = await useAPI<ProductResponse>(`/customer/products/${id}`, {
      method: 'DELETE',
      watch: false
    })
    if (error.value) {
      throw new Error(error.value.message)
    }
  }

  const addProduct = async (productId: number[]): Promise<void> => {
    const { error } = await useAPI<ProductResponse>(`/customer/products`, {
      method: 'POST',
      body: { product_id: productId },
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
    updateAddress,
    fetchAllProducts,
    allProducts,
    deleteProduct,
    customerProducts,
    fetchCustomerProducts,
    addProduct
  }
})