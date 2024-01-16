import { defineStore } from "pinia";

export const usePopupStore = defineStore('popup', {
    state: () => ({ show: false }),
    getters: {
        getShow: (state): boolean => state.show
    },
    actions: {
        setShow() {
            this.show = !this.show
        }
    }
});