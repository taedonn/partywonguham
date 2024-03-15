<template>
    <div class="w-full">
        <div class="w-full h-fit flex">
            <div class="flex flex-col shrink-0">
                <div v-for="time in period" class="w-12 h-14 last:h-[calc(3.5rem+2px)] text-xs font-light pt-2 border-t last:border-b border-gray-9">{{ time }}</div>
            </div>
            <div class="w-full flex flex-col border border-gray-9 overflow-hidden">
                <!-- 볼 화면 -->
                <div v-for="checked in periodBlock" class=" group w-full h-7 relative flex flex-col flex-auto">
                    <div
                        v-bind:style="`opacity: ${checked.checked.length >= capacity ? capacity / (capacity + 1) : checked.checked.length / (capacity + 1)}`"
                        v-bind:class="`w-full h-[calc(100%+1px)] group-first:h-full absolute z-10 bottom-0 bg-blue-5 duration-200`"
                    >
                    </div>
                    <div
                        v-if="checked.checked.length !== 0"
                        @mouseover="onMouseOver(checked)"
                        @mouseleave="onMouseLeave"
                        class="w-full h-[calc(100%+1px)] group-first:h-full absolute z-10 bottom-0 group-hover:bg-blue-5 opacity-20 cursor-pointer duration-200"
                    ></div>
                    <div class="group-last:hidden w-full h-px absolute bottom-0 bg-gray-9"></div>
                    <i v-if="checked.checked.length >= capacity" class="fa-solid fa-star absolute z-20 left-2 top-1/2 -translate-y-1/2 text-xs text-yellow-f"></i>
                </div>
            </div>
        </div>
        <div class="w-full mt-3">
            <div class="flex flex-wrap gap-4 px-6 py-4 rounded-md bg-gray-f">
                <div v-for="idx in capacity" class="flex items-center gap-1.5 relative">
                    <div
                        v-bind:style="`opacity: ${idx / (capacity + 1)}`"
                        v-bind:class="`w-4 h-4 rounded-full flex justify-center items-center bg-blue-5`"
                    >
                        <i v-if="idx >= capacity" class="fa-solid fa-star text-[0.625rem] text-yellow-f"></i>
                    </div>
                    <div class="w-8 font-light text-xs text-black-3">{{ idx + "명" }}</div>
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
        props.onMouseOver(checkedPartywon);
    }

    const onMouseLeave = () => {
        props.onMouseLeave();
    }
</script>
