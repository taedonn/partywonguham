<template>
    <div class="w-full">
        <div class="mb-2 pl-14 flex justify-center items-center text-xs">
            <div v-for="date in datesArr" v-bind:style="`width: ${1 / datesArr.length * 100}%`" class="flex flex-col items-center gap-1">
                <div v-bind:class="`${date.getDay() === 0 || date.getDay() === 6 ? 'text-red-e' : ''}`">{{ dayIntoWeekday(date.getDay()) }}</div>
                <div class="font-semibold">{{ (date.getMonth() + 1) + "." + date.getDate() }}</div>
            </div>
        </div>
        <div class="w-full h-fit flex rounded-lg border border-gray-9 overflow-hidden">
            <div class="flex flex-col shrink-0">
                <div v-for="time in times" class="w-14 h-12 text-xs text-left pl-2 pt-2 border-dashed border-r border-t first:border-t-0 border-blue-c">
                    {{
                        Number(time) < 12
                            ? time + " AM"
                            : Number(time) === 12
                                ? "12 PM"
                                : (Number(time) - 12) + " PM"
                    }}
                </div>
            </div>
            <div class="w-full flex overflow-hidden">
                <!-- 볼 화면 -->
                <div v-for="table, idx in tables" class="w-full h-full flex flex-col border-dashed border-r last:border-r-0 border-blue-c">
                    <div v-for="time in table.times" class="group w-full h-6 first:h-[calc(1.5rem+1px)] last:h-[calc(1.5rem-1px)] relative flex justify-center items-center">
                        <div
                            v-bind:style="`opacity: ${time.selected.length >= capacity ? capacity / capacity : time.selected.length / capacity}`"
                            v-bind:class="`w-full h-full absolute z-10 bottom-0 bg-blue-5 duration-200`"
                        >
                        </div>
                        <input type="radio" name="time-radio" v-bind:id="`time-${idx}-${time.time}`" @change="e => onChange(e, time)" class="time-radio peer hidden">
                        <label
                            v-if="time.selected.length !== 0"
                            v-bind:for="`time-${idx}-${time.time}`"
                            class="time-option peer-checked:bg-blue-1 peer-checked:opacity-100 w-full h-full absolute z-10 bottom-0 opacity-20 cursor-pointer group-hover:bg-blue-5 duration-200"
                        ></label>
                        <div class="group-last:hidden w-full h-px absolute z-20 bottom-0 border-b group-odd:border-dashed border-blue-c"></div>
                        <i v-if="time.selected.length >= capacity" class="fa-solid fa-star relative z-10 mb-0.5 text-[0.625rem] text-yellow-f"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    interface selectedPartywon {
        time: number,
        selected: string[],
    }

    interface Table {
        times: Time[]
    }

    interface Time {
        time: number,
        selected: string[]
    }

    // Props
    const props = defineProps({
        capacity: Number,
        datesArr: Array,
        dates: Array,
        times: Array,
        tables: Array,
        onCheck: {
            type: Function,
            required: true,
            default: () => {}
        },
        onUncheck: {
            type: Function,
            required: true,
            default: () => {}
        }
    });

    const capacity = props.capacity ? props.capacity : 0;
    const datesArr = props.datesArr ? props.datesArr as Date[] : [];
    const times = props.times ? props.times : [];
    const tables = props.tables ? props.tables as Table[] : [];

    // 클릭 이벤트
    const onChange = (e: Event, selectedPartywon: selectedPartywon) => {
        const el = e.target as HTMLInputElement;
        if (el.checked) {
            props.onCheck(selectedPartywon);
        }
    }

    const onUnchange = (e: Event) => {
        const el = e.target as HTMLElement;
        if (!el.classList.contains("time-option")) {
            const radio = document.getElementsByClassName("time-radio") as HTMLCollectionOf<HTMLInputElement>;
            for (let i = 0; i < radio.length; i++) {
                radio[i].checked = false;
            }
            props.onUncheck();
        }
    }

    onMounted(() => {
        window.addEventListener("mousedown", onUnchange);
    });

    onUnmounted(() => {
        window.removeEventListener("mousedown", onUnchange);
    });
</script>
