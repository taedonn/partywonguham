export default defineNuxtRouteMiddleware(to => {
    if (to.query.step) {
        if (
            to.query.step !== "2" &&
            to.query.step !== "3"
        ) {
            return navigateTo("/");
        }
    }
});