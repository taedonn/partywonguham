<template>
    <section class="section w-full pt-60 flex flex-col justify-center items-center gap-y-14">
        <div class="container flex flex-col justify-between">
            <div class="container flex flex-row justify-between">
                <div>
                    <h2 class="text-xl font-medium text-black-333 mb-3">언제 약속을 잡고 싶으신가요?</h2>
                    <p class="text-base font-light text-black-333">
                        일정을 잡고, 인원수를 설정한 후 생성된 타임라인을 지인들과 공유해 보세요. <br />
                        타임라인 내 특정 시간에 인원수가 채워지면 이메일로 알림이 발송됩니다.
                    </p>
                </div>
                <div class="flex justify-items-end items-center"> <Button> 일정 생성하기 </Button></div>
            </div>
            <div class="calendar-wrap flex flex-col mt-14">
                <h2 class="subtitle mb-12 text-center text-2xl ">
                    {{ currentYear }}년 {{ currentMonth }}월
                </h2>
                <div class="calendar flex flex-row ">
                    <button type="button" class="btn-prev" @click="moveMonth(-1)"> &lt; </button>
                    <table class="w-full">
                        <thead>
                            <th class="pb-5"> 일 </th>
                            <th> 월 </th>
                            <th> 화 </th>
                            <th> 수 </th>
                            <th> 목 </th>
                            <th> 금 </th>
                            <th> 토 </th>
                        </thead>
                        <tbody class="border-y border-gray-999 pt-5">
                            <tr v-for="weekIndex in data.calendarWeekCount" :key="weekIndex">
                                <td v-for="dayIndex in data.weekdate" :key="(weekIndex - 1) * data.weekdate + dayIndex"
                                    class="text-center"
                                    :class="{'text-gray-500':isPastDate(weekIndex, dayIndex)}">
                                    <div v-if="isCalendarDayVisible(weekIndex, dayIndex)">
                                        <span class="block my-6" @click="handleDateClick(weekIndex, dayIndex)">{{ getCalendarDay(weekIndex, dayIndex) }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>                       
                    <button type="button" class="btn-next" @click="moveMonth(1)"> &gt; </button>
                </div>
                <!-- calendar end -->
                <ul class="list-disc text-sm font-light text-gray-666 mt-2"> 
                    <li> 일정은 하루 단위로 생성할 수 있습니다.</li>
                    <li> 일정은 해당 날짜가 지난 후 30일이 지나면 자동으로 폐기됩니다. </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';

const data = {
    weekdate: 7, // 한 주는 7일
    dates: [],
    currentYear: 0,
    currentMonth: 0,
    year: 0,
    month: 0,
    today: 0,
    // monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // 윤년 계산을 위한
    calendarMonthLastDate: 0,
    monthStartDay: 0,
    calendarMonthStartDay: 0,
    calendarWeekCount: 0, // 주 카운트를 위한
    calendarPos: 0, // 각 날짜의 위치
    calendarDay: 0, // 각 날짜
    weekDays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
};

const date = new Date();
const currentYear = ref(date.getFullYear());
const currentMonth = ref(date.getMonth() + 1);
const today = ref(date.getDate());
// console.log(currentYear);
// console.log(currentMonth);
// console.log(today);

//윤년 계산
const updateCalendarData = () => {
    const date = new Date(currentYear.value, currentMonth.value, 0);
    data.calendarMonthLastDate = date.getDate();
    data.monthStartDay = new Date(currentYear.value, currentMonth.value - 1, 1); // 달력 월의 시작 요일
    data.calendarMonthStartDay = data.monthStartDay.getDay();
    data.calendarWeekCount = Math.ceil((data.calendarMonthStartDay + data.calendarMonthLastDate) / 7);
    data.calendarDay = 0;
};

// 주 수 카운트
data.calendarWeekCount = Math.ceil((data.calendarMonthStartDay + data.calendarMonthLastDate) / 7);
// console.log(data.calendarWeekCount); // 5 ==> 5주!

const calculateCalendarPosition = (weekIndex, dayIndex) => {
    return (weekIndex - 1) * 7 + dayIndex;
};

const isCalendarDayVisible = (weekIndex, dayIndex) => {
    return data.calendarMonthStartDay <= calculateCalendarPosition(weekIndex, dayIndex) &&
        data.calendarDay < data.calendarMonthLastDate;
};

const getCalendarDay = (weekIndex, dayIndex) => {
    if (data.calendarMonthStartDay <= calculateCalendarPosition(weekIndex, dayIndex) &&
        data.calendarDay < data.calendarMonthLastDate) {
        data.calendarDay++;
        return data.calendarDay;
    }
};

const moveMonth = (direction) => {
    const newMonth = currentMonth.value + direction;
    if (newMonth < 1) {
        currentYear.value--;
        currentMonth.value = 12;
    } else if (newMonth > 12) {
        currentYear.value++;
        currentMonth.value = 1;
    } else {
        currentMonth.value = newMonth;
    }

    // 월 변경에 따라 캘린더 데이터 업데이트
    updateCalendarData();
};

// 클릭한 날짜를 보여주는 메서드
const handleDateClick = (weekIndex, dayIndex) => {
    const yearMonth = `${currentYear.value}.${currentMonth.value}`;
    const clickedDate = calculateCalendarPosition(weekIndex, dayIndex) - data.calendarMonthStartDay + 1;
    console.log(`${yearMonth}.${clickedDate}`);
    // console.log(clickDate.text());
};

// 과거 날짜인지 확인하는 메서드
const isPastDate = (weekIndex, dayIndex) => {
    const clickedDate = calculateCalendarPosition(weekIndex, dayIndex) - data.calendarMonthStartDay + 2;
    const currentDate = new Date();
    const year = currentYear.value;
    const month = currentMonth.value;

    // 과거 년도인 경우 무조건 과거 날짜로 판단
    if (year < currentDate.getFullYear()) {
        return true;
    }
    // 현재 년도이고, 과거 월인 경우 과거 날짜로 판단
    if (year === currentDate.getFullYear() && month < currentDate.getMonth() + 1) {
        return true;
    }
    // 현재 년도, 월이면서 현재 날짜보다 이전인 경우 과거 날짜로 판단
    if (year === currentDate.getFullYear() && month === currentDate.getMonth() + 1 && clickedDate <= currentDate.getDate()) {
        return true;
    }
    // 나머지 경우는 현재 날짜 이후의 날짜로 판단
    return false;
};
updateCalendarData();

</script>