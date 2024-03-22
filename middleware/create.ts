export default defineNuxtRouteMiddleware(to => {
    if (to.path === "/create") {
        if (Number(to.query.step) <= 1 || Number(to.query.step) > 3) {
            return navigateTo("/");
        }
    }
});