<template>
    <div class="w-full">
        <div class="w-full h-fit flex rounded-lg border border-blue-a overflow-hidden">
            <div class="flex flex-col shrink-0">
                <div v-for="time in period" class="w-14 h-12 text-xs text-left pl-2 pt-2 border-dashed border-r border-t first:border-t-0 border-blue-c">{{ time }}</div>
            </div>
            <div class="w-full flex flex-col overflow-hidden">
                <!-- 볼 화면 -->
                <div v-for="checked in periodBlock" class="group w-full h-6 first:h-[calc(1.5rem+1px)] last:h-[calc(1.5rem-1px)] relative flex flex-col">
                    <div
                        v-bind:style="`opacity: ${checked.checked.length >= capacity ? capacity / capacity : checked.checked.length / capacity}`"
                        v-bind:class="`w-full h-full absolute z-10 bottom-0 bg-blue-5 duration-200`"
                    >
                    </div>
                    <div
                        v-if="checked.checked.length !== 0"
                        @mouseover="onMouseOver(checked)"
                        @mouseleave="onMouseLeave"
                        @mousedown="onMouseDown(checked)"
                        class="checked w-full h-full absolute z-10 bottom-0 lg:group-hover:bg-blue-5 opacity-20 cursor-pointer duration-200"
                    ></div>
                    <div class="group-last:hidden w-full h-px absolute z-20 bottom-0 border-b group-odd:border-dashed border-blue-c"></div>
                    <i v-if="checked.checked.length >= capacity" class="fa-solid fa-star absolute z-20 left-2 top-1/2 -translate-y-1/2 text-xs text-yellow-f"></i>
                </div>
            </div>
        </div>
        <div class="w-full mt-2">
            <div class="flex flex-wrap gap-2 px-6 py-4 rounded-lg border border-blue-a">
                <div v-for="idx in capacity" class="flex items-center gap-1.5 relative">
                    <div
                        v-bind:style="`opacity: ${idx / capacity}`"
                        v-bind:class="`w-4 h-4 rounded-full flex justify-center items-center bg-blue-5`"
                    >
                        <i v-if="idx >= capacity" class="fa-solid fa-star text-[0.625rem] text-yellow-f"></i>
                    </div>
                    <div class="w-8 text-xs text-black-3">{{ idx + "명" }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    // Types
    interface PeriodBlock {
        time: number,
        checked: Array<string>
    }

    interface CheckedPartywon {
        checked: string[],
        time: number,
    }

    // Props
    const props = defineProps({
        capacity: Number,
        period: Array,
        periodBlock: Array<PeriodBlock>,
        onMouseOver: {
            type: Function,
            required: true,
            default: () => {}
        },
        onMouseLeave: {
            type: Function,
            required: true,
            default: () => {}
        }
    });

    const capacity = props.capacity ? props.capacity : 0
    const periodBlock = props.periodBlock ? props.periodBlock : [];

    // 호버 이벤트
    const onMouseOver = (checkedPartywon: CheckedPartywon) => {
        if (window.innerWidth >= 1024) {
            props.onMouseOver(checkedPartywon);
        }
    }

    const onMouseLeave = () => {
        if (window.innerWidth >= 1024) {
            props.onMouseLeave();
        }
    }

    // 클릭 이벤트
    const onMouseDown = (checkedPartywon: CheckedPartywon) => {
        if (window.innerWidth < 1024) {
            props.onMouseOver(checkedPartywon);
        }
    }
</script>
