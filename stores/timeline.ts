import { defineStore } from "pinia";

interface Timeline {
    name: string,
    time: number[]
}

export const useTimelineStore = defineStore("timeline", {
    state: (): Timeline => ({
        name: "",
        time: []
    }),
    actions: {
        onNameChange(e: Event) {
            const el = e.target as HTMLInputElement
            this.name = el.value;
        },
    }
});