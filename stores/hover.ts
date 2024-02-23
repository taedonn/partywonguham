import { defineStore } from "pinia";

interface Hover {
    partywon: string[],
    capacity: number,
}

export const useHoverStore = defineStore("hover", {
    state: (): Hover => ({
        partywon: [],
        capacity: 0,
    }),
    actions: {
        mouseover(hover: Hover) {
            this.partywon = hover.partywon;
            this.capacity = hover.capacity;
        },
        mouseleave() {
            this.partywon = [];
            this.capacity = 0;
        }
    }
});