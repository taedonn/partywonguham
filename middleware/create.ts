export default defineNuxtRouteMiddleware(to => {
    if (to.path === "/create") {
        if (
            to.query.step !== "1" &&
            to.query.step !== "2" &&
            to.query.step !== "3"
        ) {
            return navigateTo("/");
        }
    }
});