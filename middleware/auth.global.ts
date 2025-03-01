export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token");
  if (
    !token.value &&
    to.path !== "/login" &&
    to.path !== "/technical/login" &&
    to.path !== "/technical/forget-password" &&
    to.path !== "/register" &&
    to.path !== "/forget-password" &&
    to.path !== "/reset-password" &&
    to.path !== "/"
  ) {
    return navigateTo("/login");
  }
});
