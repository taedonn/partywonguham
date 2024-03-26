<template>
    <div class="w-full h-8 mb-2 flex justify-between items-center">
        <button
            v-if="tables.length > 1"
            v-on:click="swiperPrevSlide"
            @mousedown="handleSlideBtnMouseDown"
            @mouseup="handleSlideBtnMouseUp"
            class="w-8 h-full shrink-0 rounded-full lg:hover:bg-gray-e duration-200"
        >
            <i class="fa-solid fa-angle-left"></i>
        </button>
        <div class="w-full font-semibold text-center">{{ `${states.start_date.getFullYear()}년 ${states.start_date.getMonth() + 1}월${states.start_date.getFullYear() === states.end_date.getFullYear() && states.start_date.getMonth() === states.end_date.getMonth() ? "" : ` ~ ${states.end_date.getFullYear()}년 ${states.end_date.getMonth() + 1}월`}` }}</div>
        <button
            v-if="tables.length > 1"
            v-on:click="swiperNextSlide"
            @mousedown="handleSlideBtnMouseDown"
            @mouseup="handleSlideBtnMouseUp"
            class="w-8 h-full shrink-0 rounded-full lg:hover:bg-gray-e duration-200"
        >
            <i class="fa-solid fa-angle-right"></i>
        </button>
    </div>
    <swiper
        :slides-per-view="1"
        :speed="1"
        :loop="tables.length > 1 ? true : false"
        :allow-touch-move="false"
        @swiper="onSwiper"
    >
        <swiper-slide v-for="table, tableNo in tables" :key="tableNo" class="w-full">
            <div class="mb-2 pl-14 flex justify-center items-center text-xs">
                <div v-for="column in table" v-bind:style="`width: ${1 / table.length * 100}%`" class="flex flex-col items-center gap-1">
                    <div v-bind:class="`${column.date.getDay() === 0 || column.date.getDay() === 6 ? 'text-red-e' : ''} selection:bg-transparent`">{{ dayIntoWeekday(column.date.getDay()) }}</div>
                    <div class="font-semibold selection:bg-transparent">{{ (column.date.getMonth() + 1) + "." + column.date.getDate() }}</div>
                </div>
            </div>
            <div v-bind:class="`${state.type === 'error' ? 'animate-shake' : ''} w-full h-fit flex rounded-lg border border-gray-6 overflow-hidden`">
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
                    <div v-for="column, idx in table" class="w-full h-full flex flex-col border-dashed border-r last:border-r-0 border-orange-fc">
                        <div v-for="time in column.times" class="group w-full h-6 first:h-[calc(1.5rem+1px)] relative flex flex-col">
                            <input
                                type="checkbox"
                                v-bind:id="`time-${tableNo}-${idx}-${time.time}`"
                                class="select-time peer hidden"
                            />
                            <div
                                v-bind:data-time="`time-${tableNo}-${idx}-${time.time}`"
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
        </swiper-slide>
    </swiper>
    <div v-if="state.type === 'error'" class="w-full mt-2 text-xs text-left text-red-e">{{ state.msg }}</div>
</template>

<script setup lang="ts">
    // Swiper
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';

    const swiperInstance = ref();
    function onSwiper(swiper: any) {
        swiperInstance.value = swiper;
    }
    const swiperNextSlide = () => {
        swiperInstance.value.slideNext();
        getDate();
    };
    const swiperPrevSlide = () => {
        swiperInstance.value.slidePrev();
        getDate();
    };

    const getDate = () => {
        const activeSlide = document.getElementsByClassName("swiper-slide-active")[0] as HTMLDivElement;
        const idx = activeSlide.getAttribute("data-swiper-slide-index") + "";
        states.start_date = tables[Number(idx)][0].date;
        states.end_date = tables[Number(idx)][tables[Number(idx)].length-1].date;
    }

    // Common
    import { dayIntoWeekday } from '~/utils/common';

    // Types
    import type { Table } from '~/utils/global.d';

    interface States {
        start_date: Date,
        end_date: Date
    }

    // Props
    const props = defineProps({
        times: Array,
        dates: Array,
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

    const times = props.times ? props.times : [];
    const dates = props.dates ? props.dates as string[] : [];
    const tables = props.tables ? props.tables as Table[][] : [];

    // States
    const states: States = reactive({
        start_date: tables[0][0].date,
        end_date: tables[0][tables[0].length-1].date
    });

    /** 슬라이더 버튼 이벤트 */
    const handleSlideBtnMouseDown = (e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement;
        button.classList.remove("lg:hover:bg-gray-e");
        button.classList.add("lg:hover:bg-gray-d");
    }
    const handleSlideBtnMouseUp = (e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement;
        button.classList.remove("lg:hover:bg-gray-d");
        button.classList.add("lg:hover:bg-gray-e");
    }

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
        let length = 0;

        for (let i = 0; i < dates.length; i++) {
            result.push([]);
        }

        for (let i = 0; i < option.length; i++) {
            let input = option[i] as HTMLInputElement;
            let split = input.id.split("-");
            let table = Number(split[1]);
            let date = Number(split[2]);
            let time = Number(split[3]);
            if (input.checked) {
                result[(table * 7) + date].push(time);
                length++;
            }
        }
        props.onChange(length === 0 ? [] : result);
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