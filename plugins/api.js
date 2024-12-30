export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: "https://app.rezeqstore.com/api/v1/",
    onRequest({ request, options, error }) {
      options.headers.set("Accept", "application/json");
      // options.headers.set("Accept", "application/json");
      // if (session.value?.token) {
      //   // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
      //   // options.headers.set("Authorization", `Bearer ${session.value?.token}`);
      // }
    },
    async onResponseError({ response }) {
      // if (response.status === 401) {
      //   await nuxtApp.runWithContext(() => navigateTo("/login"));
      // }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
