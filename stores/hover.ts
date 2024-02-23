import { defineStore } from "pinia";

interface Hover {
    partywon: string[],
}

export const useHoverStore = defineStore("hover", {
    state: (): Hover => ({
        partywon: [],
    }),
    actions: {
        mouseover(hover: Hover) {
            this.partywon = hover.partywon;
        },
        mouseleave() {
            this.partywon = [];
        }
    }
});