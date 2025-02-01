export default defineNuxtPlugin((nuxtApp) => {
  const { showError } = useAlertStore();
  const token = useCookie("token");
  const locale = useCookie("i18n_redirected");
  const api = $fetch.create({
    baseURL: "https://app.rezeqstore.com/api/v1/",
    onRequest({ request, options, error }) {
      options.headers.set("Accept", "application/json");
      options.headers.set("Accept-Language", locale.value);
      if (token.value) {
        options.headers.set("Authorization", `Bearer ${token.value}`);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
      showError(response._data.message);
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
