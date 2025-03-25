import type {
  AddressData,
  Address,
  City,
  ApiResponse,
  District,
  Product,
  CustomerData,
  UpdateProfileRequest,
  ChangePasswordRequest,
  Category,
} from "~/types/settings";

export const useSettingsStore = defineStore("settings", () => {
  const { isTechnician, user } = storeToRefs(useAuthStore());
  // profile
  const customerData = ref<CustomerData>();
  const getCustomerData = async () => {
    const { data } = await useAPI<ApiResponse<CustomerData>>(
      `/${isTechnician.value ? "technician" : "customer"}`
    );
    customerData.value = data.value?.data;
  };

  const updateProfile = async (updatedData: UpdateProfileRequest) => {
    const { error } = await useAPI<ApiResponse<CustomerData>>(
      "/customer/update-profile",
      {
        method: "PUT",
        body: updatedData,
        watch: false,
      }
    );
  };

  const updatePhone = async (phone: string) => {
    const { error } = await useAPI<ApiResponse<CustomerData>>(
      "/customer/update-phone",
      {
        method: "PUT",
        body: {
          phone,
        },
        watch: false,
      }
    );
  };

  const changePassword = async (passwordUpdates: ChangePasswordRequest) => {
    const { error } = await useAPI(
      `/${isTechnician.value ? "technician" : "customer"}/change-password`,
      {
        method: "POST",
        body: passwordUpdates,
        watch: false,
      }
    );
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  // addresses apis
  const allAddresses = ref<AddressData>();
  const allCities = ref<City[]>();
  const districts = ref<District[]>();

  const fetchAllAddresses = async (): Promise<void> => {
    const { data } = await useAPI<ApiResponse<AddressData>>("/addresses");
    allAddresses.value = data.value?.data;
    return data;
  };

  const fetchAllCities = async (): Promise<void> => {
    const { data } = await useAPI<ApiResponse<City[]>>("/cities");
    allCities.value = data.value?.data;
  };

  const fetchAllDistricts = async (cityId: number): Promise<void> => {
    const { data } = await useAPI<ApiResponse<District[]>>(
      `/cities/${cityId}/districts`
    );
    districts.value = data.value?.data;
  };

  const createAddress = async (address: Address): Promise<void> => {
    const { error } = await useAPI<ApiResponse<AddressData>>("/addresses", {
      method: "POST",
      body: address,
      watch: false,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  const deleteAddress = async (id: number): Promise<void> => {
    const { error } = await useAPI<ApiResponse<AddressData>>(
      `/addresses/${id}`,
      {
        method: "DELETE",
        watch: false,
      }
    );
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  const getSingleAddress = async (
    id: number
  ): Promise<AddressData | undefined> => {
    const { data } = await useAPI<ApiResponse<AddressData>>(`/addresses/${id}`);
    return data.value?.data;
  };

  const updateAddress = async (address: Address): Promise<void> => {
    const { error } = await useAPI<ApiResponse<AddressData>>(
      `/addresses/${address.id}`,
      {
        method: "PUT",
        body: address,
        watch: false,
      }
    );
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  // Products apis
  const allProducts = ref<Product[]>();
  const customerProducts = ref<Product[]>();

  const fetchAllProducts = async (params?: any): Promise<void> => {
    const { data } = await useAPI<ApiResponse<Product[]>>("/products", {
      params,
      watch: false,
    });
    allProducts.value = data.value?.data;
  };

  const fetchCustomerProducts = async (): Promise<void> => {
    const { data } = await useAPI<ApiResponse<Product[]>>("/customer/products");
    customerProducts.value = data.value?.data;
  };

  const deleteProduct = async (id: number): Promise<void> => {
    const { error } = await useAPI<ApiResponse<Product[]>>(
      `/customer/products/${id}`,
      {
        method: "DELETE",
        watch: false,
      }
    );
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  const addProduct = async (productId: number): Promise<void> => {
    const { status, error } = await useAPI<ApiResponse<Product[]>>(
      `/customer/products`,
      {
        method: "POST",
        body: { product_id: productId },
        watch: false,
      }
    );
    if (status.value === "success") {
      await fetchCustomerProducts();
    }
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  const fetchCategories = async () => {
    return useAPI<ApiResponse<Category[]>>("/categories");
  };

  // help and support

  const sendSupportForm = async (supportForm: {
    subject: string;
    details: string;
  }) => {
    const { error } = await useAPI("/support-form", {
      method: "POST",
      body: {
        user_id: user.value?.id,
        user_type: isTechnician.value ? "technician" : "customer",
        platform: "web",
        ...supportForm,
      },
      watch: false,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  const notifications = ref();
  const fetchAllNotifications = async () => {
    const { data } = await useAPI<ApiResponse<Notification[]>>(
      "/notifications"
    );
    notifications.value = data.value?.data;
    return data;
  };

  const setAllNotificationsRead = () => {
    return useAPI("/notifications/read-all", {
      method: "POST",
    });
  };

  const readSingleNotification = (id: any) => {
    return useAPI(`/notifications/${id}/read`, {
      method: "POST",
    });
  };
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
    changePassword,
    fetchCategories,
    sendSupportForm,
    fetchAllNotifications,
    setAllNotificationsRead,
    readSingleNotification,
    notifications,
  };
});
