import type { AddressData, Address, City, ApiResponse, District, Product, CustomerData, UpdateProfileRequest, ChangePasswordRequest } from "~/types/settings"

export const useSettingsStore = defineStore('settings', () => {
  // profile
  const customerData = ref<CustomerData>()

  const getCustomerData = async () => {
    const { data } = await useAPI<ApiResponse<CustomerData>>('/customer')
    customerData.value = data.value?.data
  }

  const updateProfile = async (updatedData: UpdateProfileRequest) => {
    const { error } = await useAPI<ApiResponse<CustomerData>>('/customer/update-profile', {
      method: 'PUT',
      body: updatedData,
      watch: false
    })
  }

  const updatePhone = async (phone: string) => {
    const { error } = await useAPI<ApiResponse<CustomerData>>('/customer/update-phone', {
      method: "PUT",
      body: {
        phone
      },
      watch: false
    })
  }

  const changePassword = async (passwordUpdates: ChangePasswordRequest) => {
    const { error } = await useAPI("/customer/change-password", {
      method: "POST",
      body: passwordUpdates,
      watch: false
    })
    if (error.value) {
      throw new Error(error.value.message)
    }
  }

  // addresses apis
  const allAddresses = ref<AddressData>()
  const allCities = ref<City[]>()
  const districts = ref<District[]>()

  const fetchAllAddresses = async (): Promise<void> => {
    const { data } = await useAPI<ApiResponse<AddressData>>('/addresses')
    allAddresses.value = data.value?.data
  }

  const fetchAllCities = async (): Promise<void> => {
    const { data } = await useAPI<ApiResponse<City[]>>('/cities')
    allCities.value = data.value?.data
  }

  const fetchAllDistricts = async (cityId: number): Promise<void> => {
    const { data } = await useAPI<ApiResponse<District[]>>(`/cities/${cityId}/districts`)
    districts.value = data.value?.data
  }

  const createAddress = async (address: Address): Promise<void> => {
    const { error } = await useAPI<ApiResponse<AddressData>>('/addresses', {
      method: 'POST',
      body: address,
      watch: false
    })
    if (error.value) {
      throw new Error(error.value.message)
    }
  }

  const deleteAddress = async (id: number): Promise<void> => {
    const { error } = await useAPI<ApiResponse<AddressData>>(`/addresses/${id}`, {
      method: 'DELETE',
      watch: false
    })
    if (error.value) {
      throw new Error(error.value.message)
    }
  }


  const getSingleAddress = async (id: number): Promise<AddressData | undefined> => {
    const { data } = await useAPI<ApiResponse<AddressData>>(`/addresses/${id}`)
    return data.value?.data
  }

  const updateAddress = async (address: Address): Promise<void> => {
    const { error } = await useAPI<ApiResponse<AddressData>>(`/addresses/${address.id}`, {
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
    const { data } = await useAPI<ApiResponse<Product[]>>('/products')
    allProducts.value = data.value?.data
  }


  const fetchCustomerProducts = async (): Promise<void> => {
    const { data } = await useAPI<ApiResponse<Product[]>>('/customer/products')
    customerProducts.value = data.value?.data
  }

  const deleteProduct = async (id: number): Promise<void> => {
    const { error } = await useAPI<ApiResponse<Product[]>>(`/customer/products/${id}`, {
      method: 'DELETE',
      watch: false
    })
    if (error.value) {
      throw new Error(error.value.message)
    }
  }

  const addProduct = async (productId: number): Promise<void> => {
    const { error } = await useAPI<ApiResponse<Product[]>>(`/customer/products`, {
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
    addProduct,
    customerData,
    getCustomerData,
    updateProfile,
    updatePhone,
    changePassword
  }
})