<template>
    <div class="w-full h-8 mb-2 lg:mb-4 flex justify-between items-center">
        <button v-on:click="swiperPrevSlide" class="w-8 h-full rounded-full lg:hover:bg-gray-f">
            <i class="fa-solid fa-angle-left"></i>
        </button>
        <div class="font-semibold">{{ `${states.start_date.getFullYear()}년 ${states.start_date.getMonth() + 1}월${states.start_date.getFullYear() === states.end_date.getFullYear() && states.start_date.getMonth() === states.end_date.getMonth() ? "" : ` ~ ${states.end_date.getFullYear()}년 ${states.end_date.getMonth() + 1}월`}` }}</div>
        <button v-on:click="swiperNextSlide" class="w-8 h-full rounded-full lg:hover:bg-gray-f">
            <i class="fa-solid fa-angle-right"></i>
        </button>
    </div>
    <swiper
        :slides-per-view="1"
        :speed="1"
        :loop="true"
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
            <div class="w-full h-fit flex rounded-lg border border-gray-6 overflow-hidden">
                <div class="flex flex-col shrink-0">
                    <div v-for="time in times" class="w-14 h-12 text-xs text-left pl-2 pt-2 border-dashed border-r border-t first:border-t-0 border-orange-fc selection:bg-transparent">
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
                    <div v-for="column, idx in table" class="w-full h-full flex flex-col border-dashed border-r last:border-r-0 border-orange-fc">
                        <div v-for="time in column.times" class="group w-full h-6 first:h-[calc(1.5rem+1px)] last:h-[calc(1.5rem-1px)] relative flex justify-center items-center">
                            <div
                                v-bind:style="`opacity: ${time.selected.length >= capacity ? capacity / capacity : time.selected.length / capacity}`"
                                v-bind:class="`w-full h-full absolute z-10 bottom-0 bg-orange-f6 duration-200`"
                            >
                            </div>
                            <input type="radio" name="time-radio" v-bind:id="`time-${tableNo}-${idx}-${time.time}`" @change="e => onChange(e, time)" class="time-radio peer hidden">
                            <label
                                v-if="time.selected.length !== 0"
                                v-bind:for="`time-${tableNo}-${idx}-${time.time}`"
                                class="time-option peer-checked:bg-orange-f3 peer-checked:opacity-100 w-full h-full absolute z-10 bottom-0 opacity-20 cursor-pointer group-hover:bg-orange-f6 duration-200"
                            ></label>
                            <div class="group-last:hidden w-full h-px absolute z-20 bottom-0 border-b group-odd:border-dashed border-orange-fc"></div>
                            <i v-if="time.selected.length >= capacity" class="fa-solid fa-star relative z-10 mb-0.5 text-[0.625rem] text-yellow-f"></i>
                        </div>
                    </div>
                </div>
            </div>
        </swiper-slide>
    </swiper>
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

    // Types
    interface selectedPartywon {
        time: number,
        selected: string[],
    }

    interface Table {
        date: Date
        times: Time[]
    }

    interface Time {
        time: number,
        selected: string[]
    }

    interface States {
        start_date: Date,
        end_date: Date
    }

    // Props
    const props = defineProps({
        capacity: Number,
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
    const times = props.times ? props.times : [];
    const tables = props.tables ? props.tables as Table[][] : [];

    // States
    const states: States = reactive({
        start_date: tables[0][0].date,
        end_date: tables[0][tables[0].length-1].date
    });

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
