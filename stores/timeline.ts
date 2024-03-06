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
        },
        onTimelineChange(checked: boolean, num: number) {
            if (checked) {
                this.time.push(num);
            }
            else {
                const filteredTime = this.time.filter(el => el !== num);
                this.time = filteredTime;
            }
        }
    }
});