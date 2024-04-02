export default defineNuxtRouteMiddleware(to => {
    if (to.query.step) {
        if (
            to.query.step !== "2" &&
            to.query.step !== "3" &&
            to.query.step !== "4" &&
            to.query.step !== "5"
        ) {
            return navigateTo("/");
        }
    }
});