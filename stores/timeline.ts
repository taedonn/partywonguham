import { defineStore } from "pinia";

interface Timeline {
    name: string,
    nameState: string,
    time: number[]
}

export const useTimelineStore = defineStore("timeline", {
    state: (): Timeline => ({
        name: "",
        nameState: "",
        time: []
    }),
    actions: {
        onNameReset() {
            this.name = "";
            this.nameState = "";
        },
        onNameChange(name: string) {
            this.name = name;
            this.nameState = "";
        },
        onNameStateReset() {
            this.nameState = "";
        },
        onNameStateChange(state: string) {
            this.nameState = state;
        }
    }
});