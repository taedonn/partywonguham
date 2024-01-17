<template>
    <section class="section w-full py-60 flex flex-col justify-center items-center gap-y-14">
        <div class="container flex flex-row justify-between">
            <div>
                <h2 class="text-xl font-medium text-black-333 mb-3">언제 약속을 잡고 싶으신가요?</h2>
                <p class="text-base font-light text-black-333">일정을 잡고, 인원수를 설정한 후 생성된 타임라인을 지인들과 공유해 보세요. <br />타임라인 내 특정 시간에 인원수가 채워지면 이메일로 알림이 발송됩니다.</p>
            </div>
            <div class="flex justify-items-end items-center"> <Button> 일정 생성하기 </Button></div>
        </div>
        <div class="container flex flex-col justify-center items-center">
            <h2 class="subtitle mb-12">
                <button class="button is-small is-primary is-outlined mr-5" @click="calendarData(-1)">&lt;</button>
                {{ year }}년 {{ month }}월
                <button class="button is-small is-primary is-outlined ml-5" @click="calendarData(1)">&gt;</button>
            </h2>
            <div class="w-full h-100 flex flex-rows px-16 justify-between">
                <p  v-for="weeks in week" :key="weeks" class="">{{ weeks }}</p>
            </div>
            <table class="table">
                <thead>
                    <th v-for="day in days" :key="day">{{ day }}</th>
                </thead>
                <tbody class="w-full">
                    <tr v-for="(date, rowIndex) in dates" :key="rowIndex" class="w-full flex">
                        <td v-for="(day, colIndex) in date"  
                        :key="colIndex" 
                        :style="{ 'color': isOutsideMonth(rowIndex, colIndex) ? 'text-white' : (isToday(day) ? 'text-black' : ''), 'selected': clickDay == day ? 'blue' : '' }"
                        class="w-20 h-20 flex justify-center items-center "
                        :class="{
                                    'text-white': isOutsideMonth(rowIndex, colIndex),
                                    'text-black': isToday(day),
                                    'selected': clickDay == day ? 'blue' : '',
                                    'text-gray-400': isPastDay(day),
                                }"
                        @click="handleDateClick(day)"
                        >
                            <p class="after:absolute after:w-2 after:h-2 after:bg-black " 
                            :class="[clickDay == day ? 'after:block' : 'after:hidden']"
                            >{{ day }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- <tbody class="w-full">
        <tr v-for="(date, idx) in dates" :key="idx" class="w-full flex">
            <td v-for="(day, secondIdx) in date" 
            :key="secondIdx" 
            :class="{ 'text-white': (idx === 0 && day >= lastMonthStart) || (dates.length - 1 === idx && nextMonthStart > day),
                    'has-text-primary': day === today && month === currentMonth && year === currentYear }"
            class="w-20 h-20 flex justify-center items-center "
            @click="handleDateClick(day)"
            >
                <p class="after:absolute after:w-2 after:h-2 after:bg-black " 
                :class="[clickDay == day ? 'after:block' : 'after:hidden']"
                >{{ day }}</p>
            </td>
        </tr>
    </tbody> -->
    <!-- :class="{ 'text-white': isOutsideMonth(rowIndex, colIndex),
                                    'black-333': isToday(day),
                                    'selected' : clickDay == day }" -->
                
</template>

<script>
import { ref } from "vue";
import * as DateData from '../utils/date';
// import * as Date from './Calendarsc';

export default {
    name: "Calendar",
    data() {
        return {
            week: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
            dates: [],
            currentYear: 0,
            year: 0,
            month: 0,
            lastMonthStart: 0,
            nextMonthStart: 0,
            today: 0,
            clickDay : null,
        }
    },
    created() {
        const date = new Date()
        this.currentYear = date.getFullYear() // 이하 현재 년, 월 가지고 있기
        this.currentMonth = date.getMonth() + 1
        this.year = this.currentYear
        this.month = this.currentMonth
        this.today = date.getDate() // 오늘 날짜
        this.calendarData()
    },
    methods: {
        calendarData(arg) {
            // 인자를 추가
            if (arg < 0) {
                // -1이 들어오면 지난 달 달력으로 이동
                this.month -= 1
            } else if (arg === 1) {
                // 1이 들어오면 다음 달 달력으로 이동
                this.month += 1
            }
            if (this.month === 0) {
                // 작년 12월
                this.year -= 1
                this.month = 12
            } else if (this.month > 12) {
                // 내년 1월
                this.year += 1
                this.month = 1
            }
            const [monthFirstDay, monthLastDate, lastMonthLastDate] = this.getFirstDayLastDate(this.year, this.month)
            this.dates = this.getMonthOfDays(monthFirstDay, monthLastDate, lastMonthLastDate)
        },
        getFirstDayLastDate(year, month) {
            const firstDay = new Date(year, month - 1, 1).getDay(); // 이번 달 시작 요일
            const lastDate = new Date(year, month, 0).getDate(); // 이번 달 마지막 날짜
            let lastYear = year;
            let lastMonth = month - 1;

            if (month === 0) {
                // 1월인 경우에는 작년 12월로 설정
                lastMonth = 12;
                lastYear -= 1;
            }

            const prevLastDate = new Date(lastYear, lastMonth, 0).getDate(); // 지난 달 마지막 날짜
            return [firstDay, lastDate, prevLastDate];
        },
        getMonthOfDays(monthFirstDay, monthLastDate, prevMonthLastDate) {
            let day = 1;
            let prevDay = prevMonthLastDate - monthFirstDay + 1;
            const dates = [];
            let weekOfDays = [];

            while (day <= monthLastDate) {
                if (day === 1 && monthFirstDay !== 0) {
                    // 이 부분을 수정하여 현재 월이 시작되기 전의 날짜는 추가하지 않도록 함
                    for (let j = 0; j < monthFirstDay; j += 1) {
                        weekOfDays.push(prevDay);
                        prevDay += 1;
                    }
                }
                weekOfDays.push(day);

                if (weekOfDays.length === 7) {
                dates.push(weekOfDays);
                weekOfDays = [];
                }

                day += 1;
            }

            // 남은 날짜를 마지막 주에 추가하는 부분
            if (weekOfDays.length > 0) dates.push(weekOfDays);

            return dates;
        },
        isOutsideMonth(rowIndex, colIndex) {
            // 함수를 사용하여 현재 월의 시작과 끝을 확인하고 셀이 현재 월에 속하는지 여부를 반환
            const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
            const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDay();

            // 현재 월의 시작과 끝 인덱스를 계산
            const startIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
            const endIndex = lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1;

            // 현재 셀이 현재 월에 속하는지 여부를 판단
            return (rowIndex === 0 && colIndex < startIndex) || (rowIndex === 5 && colIndex > endIndex);
        },
        isToday(day) {
            // 함수를 사용하여 현재 날짜인지 여부를 반환
            const today = new Date();
            const currentMonthFirstDay = new Date(this.currentYear, this.currentMonth - 1, 1);
            const lastMonthLastDay = new Date(this.currentYear, this.currentMonth, 0);

            return (
                today.getDate() === day &&
                today.getMonth() === this.currentMonth &&
                today.getFullYear() === this.currentYear &&
                today >= currentMonthFirstDay &&
                today <= lastMonthLastDay
            );
        },
        handleDateClick(day, rowIndex, colIndex) {
            // 클릭한 날짜를 추적하거나 원하는 동작 수행
            if (!this.isOutsideMonth(rowIndex, colIndex) && !this.isPastDay(day) ) {
                // 클릭한 날짜가 현재 월에 속하면 저장
                this.clickDay = day;
                console.log(`클릭한 날짜: ${day}`);
            } else {
                // 클릭한 날짜가 현재 월에 속하지 않으면 아무 동작도 수행하지 않음
                console.log(`클릭한 날짜 (${day})는 현재 월에 속하지 않습니다.`);
            }
            
        },
        isPastDay(day) {
            // 오늘을 기준으로 지난 날짜인지 여부를 반환
            const today = new Date();
            const currentMonthFirstDay = new Date(
                this.currentYear,
                this.currentMonth - 1,
                1
            );
            let lastMonthLastDay = new Date(this.currentYear, this.currentMonth, 0);

            const currentDate = new Date(
                this.currentYear,
                this.currentMonth - 1,
                day +1
            );

            return currentDate < today && currentDate >= currentMonthFirstDay;
        },

    },
}
</script>

<style>
.calendar-wrap {
    margin-top: 200px;
}
</style>
