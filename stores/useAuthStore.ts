import { defineStore } from "pinia";
import type { Customer, UserRegistrationDetails } from "~/types";

export const useAuthStore = defineStore('auth', () => {
  const user = useCookie<Customer | null>("user");
  const token = useCookie<string | null>("token");
  // const isLoggedIn = computed(() => !!user.value && !!token.value);

  const setUser = (newUser: Customer) => {
    user.value = newUser;
  }

  const setToken = (newToken: string) => {
    token.value = newToken;
  }

  const login = async ({ phone, password }: { phone: string, password: string }) => {
    const { data, error } = await useAPI("/customer/login", {
      method: "POST",
      body: { phone, password },
    });
    if (error.value) {
      throw error.value;
    }
    const response = data.value as { data: { token: string, customer: Customer } };
    setToken(response.data.token);
    setUser(response.data.customer);
  }

  const register = async (registerDetails: UserRegistrationDetails) => {
    const { error } = await useAPI("/customer/register", {
      method: "POST",
      body: registerDetails,
      watch: false,
    });

    if (error.value) {
      throw new Error(error.value.message);
    }

  };


  const verifyOTP = async (otp: string, phone: string) => {
    const { data, error } = await useAPI("/customer/verify-otp", {
      method: "POST",
      body: {
        phone,
        otp,
      },
      watch: false,
    });

    if (error.value) {
      throw new Error(error.value.message);
    }
    const response = data.value as { data: { token: string, customer: Customer } };
    setToken(response.data.token);
    setUser(response.data.customer);
  };

  const resetPassword = async ({
    phoneNumber,
    otp,
    passwordUpdates,
  }: {
    phoneNumber: string;
    otp: string;
    passwordUpdates: { current_password: string; password: string; confirm_password: string };
  }) => {
    const { data, error } = await useAPI("/customer/reset-password", {
      method: "POST",
      body: {
        phone: phoneNumber,
        otp,
        password: passwordUpdates.current_password,
        // new_password: passwordUpdates.password,
        confirm_password: passwordUpdates.confirm_password,
      },
      watch: false,
    });

    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  const handleForgetPassword = async (phoneNumber: string) => {
    const { data, error } = await useAPI("/customer/forgot-password", {
      method: "POST",
      body: { phone: phoneNumber },
      watch: false,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  const logout = async () => {

    const { error } = await useAPI("/customer/logout", {
      method: "POST",
      watch: false,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    token.value = null;
    user.value = null;
  }

  return {
    login,
    register,
    verifyOTP,
    resetPassword,
    handleForgetPassword,
    logout
  }

})