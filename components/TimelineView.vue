<template>
    <div class="w-full">
        <div class="w-full h-fit flex">
            <div class="flex flex-col shrink-0">
                <div v-for="time in period" class="w-12 h-14 text-xs font-light pt-0.5">{{ time }}</div>
            </div>
            <div class="w-full flex flex-col rounded-md border border-gray-999 overflow-hidden">
                <!-- 볼 화면 -->
                <div v-for="checked in periodBlock" class=" group w-full relative flex flex-col flex-auto">
                    <div
                        v-bind:style="`opacity: ${checked.checked.length >= capacity ? capacity / (capacity + 1) : checked.checked.length / (capacity + 1)}`"
                        v-bind:class="`w-full h-[calc(100%+1px)] group-first:h-full absolute z-10 bottom-0 bg-blue-4 duration-100`"
                    >
                    </div>
                    <div
                        v-if="checked.checked.length !== 0"
                        @mouseover="onMouseOver(checked)"
                        @mouseleave="onMouseLeave"
                        class="w-full h-[calc(100%+1px)] group-first:h-full absolute z-10 bottom-0 group-hover:bg-blue-4 opacity-20 cursor-pointer duration-100"
                    ></div>
                    <div class="group-last:hidden w-full h-px absolute bottom-0 bg-gray-999"></div>
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
