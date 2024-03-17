<template>
    <div v-bind:class="`${state.type === 'error' ? 'animate-shake' : ''} w-full rounded-lg border border-gray-9 overflow-hidden`">
        <div class="w-full h-fit flex">
            <div class="flex flex-col shrink-0">
                <div v-for="time in period" class="w-14 h-14 last:h-[calc(3.5rem+2px)] text-xs text-left pl-2 pt-2 border-r border-t first:border-t-0 border-gray-9">{{ time }}</div>
            </div>
            <div class="w-full flex flex-col overflow-hidden">
                <!-- 선택 화면 -->
                <div v-for="checked in periodBlock" class="group w-full h-7 first:h-[calc(1.75rem+1px)] relative flex flex-col">
                    <input
                        type="checkbox"
                        v-bind:id="`time-${checked.time}`"
                        class="select-time peer hidden"
                    />
                    <div
                        v-bind:data-id="`time-${checked.time}`"
                        class="w-full h-full group-last:h-[calc(100%+1px)] absolute z-10 bottom-0 group-last:-bottom-px cursor-[row-resize] duration-200 peer-checked:bg-blue-5/80 lg:hover:bg-blue-5/40"
                        @mouseover="onMouseOver"
                        @mousedown="onMouseDown"
                        @mouseup="onMouseUp"
                    ></div>
                    <div class="group-last:hidden w-full h-px absolute bottom-0 cursor-[row-resize] bg-gray-9 peer-checked:bg-gray-9/60"></div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="state.type === 'error'" class="mt-2 text-xs text-left text-red-e">{{ state.msg }}</div>
</template>

<script setup lang="ts">
    // Common
    import { removeStr } from '~/utils/common';

    // Types
    interface PeriodBlock {
        time: number,
        checked: Array<string>
    }

    // Props
    const props = defineProps({
        period: Array,
        periodBlock: Array<PeriodBlock>,
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

    const periodBlock = props.periodBlock ? props.periodBlock : [];

    // 드래그 이벤트
    let isChecked = false;
    let isMouseDown = false;

    const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        const el = e.currentTarget as HTMLDivElement;
        const id = el.getAttribute("data-id") + "";
        const input = document.getElementById(id) as HTMLInputElement;
        input.checked = !input.checked;
        isChecked = input.checked;
        props.onStateChange();
    }

    const onMouseOver = (e: MouseEvent) => {
        const el = e.target as HTMLDivElement;
        const id = el.getAttribute("data-id") + "";
        const input = document.getElementById(id) as HTMLInputElement;
        if (isMouseDown) input.checked = isChecked;
    }

    const onMouseUp = () => {
        const input = document.getElementsByClassName("select-time");
        const arr = [];
        for (let i = 0; i < input.length; i++) {
            let thisInput = input[i] as HTMLInputElement;
            let id = Number(removeStr(thisInput.id, "time-"));
            if (thisInput.checked) arr.push(id);
        }
        props.onChange(arr);
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