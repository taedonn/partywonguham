<template>
    <div class="mb-2 pl-14 flex justify-center items-center text-xs">
        <div v-for="date in datesArr" v-bind:style="`width: ${1 / datesArr.length * 100}%`" class="flex flex-col items-center gap-1">
            <div v-bind:class="`${date.getDay() === 0 || date.getDay() === 6 ? 'text-red-e' : ''}`">{{ dayIntoWeekday(date.getDay()) }}</div>
            <div class="font-semibold">{{ (date.getMonth() + 1) + "." + date.getDate() }}</div>
        </div>
    </div>
    <div v-bind:class="`${state.type === 'error' ? 'animate-shake' : ''} w-full rounded-lg border border-gray-6 overflow-hidden`">
        <div class="w-full h-fit flex">
            <div class="flex flex-col shrink-0">
                <div v-for="time in times" class="w-14 h-12 last:h-[calc(3rem+2px)] text-xs text-left pl-2 pt-2 border-dashed border-r border-t first:border-t-0 border-orange-fc">
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
                <!-- 선택 화면 -->
                <div v-for="table, idx in tables" class="w-full h-full flex flex-col border-dashed border-r last:border-r-0 border-orange-fc">
                    <div v-for="time in table.times" class="group w-full h-6 first:h-[calc(1.5rem+1px)] relative flex flex-col">
                        <input
                            type="checkbox"
                            v-bind:id="`time-${idx}-${time.time}`"
                            class="select-time peer hidden"
                        />
                        <div
                            v-bind:data-time="`time-${idx}-${time.time}`"
                            class="w-full h-full group-last:h-[calc(100%+1px)] absolute z-10 bottom-0 group-last:-bottom-px cursor-[row-resize] duration-200 peer-checked:bg-orange-f6 lg:hover:bg-orange-f6/50"
                            @mouseover="onMouseOver"
                            @mousedown="onMouseDown"
                            @mouseup="onMouseUp"
                        ></div>
                        <div class="group-last:hidden w-full h-px absolute z-20 bottom-0 border-b group-odd:border-dashed cursor-[row-resize] border-orange-fc"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="state.type === 'error'" class="mt-2 text-xs text-left text-red-e">{{ state.msg }}</div>
</template>

<script setup lang="ts">
    // Common
    import { dayIntoWeekday } from '~/utils/common';

    interface Table {
        times: Time[]
    }

    interface Time {
        time: number,
        selected: string[]
    }

    // Props
    const props = defineProps({
        datesArr: Array,
        dates: Array,
        times: Array,
        tables: Array,
        onChange: {
            type: Function,
            required: true,
            default: () => {},
        },
        state: {
            type: Object,
            required: false,
            default: {}
        },
        onStateChange: {
            type: Function,
            required: false,
            default: () => {}
        },
    });

    const datesArr = props.datesArr ? props.datesArr as Date[] : [];
    const times = props.times ? props.times : [];
    const tables = props.tables ? props.tables as Table[] : [];

    // 드래그 이벤트
    let isChecked = false;
    let isMouseDown = false;

    const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        const el = e.currentTarget as HTMLDivElement;
        const id = el.getAttribute("data-time") + "";
        const input = document.getElementById(id) as HTMLInputElement;
        input.checked = !input.checked;
        isChecked = input.checked;
        props.onStateChange();
    }

    const onMouseOver = (e: MouseEvent) => {
        const el = e.target as HTMLDivElement;
        const id = el.getAttribute("data-time") + "";
        const input = document.getElementById(id) as HTMLInputElement;
        if (isMouseDown) input.checked = isChecked;
    }

    const onMouseUp = () => {
        const option = document.getElementsByClassName("select-time");
        const result: number[][] = [];

        for (let i = 0; i < datesArr.length; i++) {
            result.push([]);
        }

        for (let i = 0; i < option.length; i++) {
            let input = option[i] as HTMLInputElement;
            let split = input.id.split("-");
            let date = Number(split[1]);
            let time = Number(split[2]);
            if (input.checked) result[date].push(time);
        }
        props.onChange(result);
    }

    const onGlobalMouseDown = () => { isMouseDown = true; }
    const onGlobalMouseUp = () => { isMouseDown = false; }

    onMounted(() => {
        window.addEventListener("mousedown", onGlobalMouseDown);
        window.addEventListener("mouseup", onGlobalMouseUp);
    });

    onUnmounted(() => {
        window.removeEventListener("mousedown", onGlobalMouseDown);
        window.removeEventListener("mouseup", onGlobalMouseUp);
    });
</script>