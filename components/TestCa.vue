<template>
    <section class="section w-full py-60 flex flex-col justify-center items-center gap-y-14">
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
        <div class="container flex flex-col justify-center items-center">
            <h2 class="subtitle mb-12">
                <button class="button is-small is-primary is-outlined mr-5" @click="calendarData(-1)">&lt;</button>
                {{ year }}년 {{ month }}월
                <button class="button is-small is-primary is-outlined ml-5" @click="calendarData(1)">&gt;</button>
            </h2>
            <div class="w-full h-100 flex flex-rows px-16 justify-between">
                <p v-for="weeks in week" :key="weeks" class="">{{ weeks }}</p>
            </div>
            <table class="table">
                <thead>
                    <th v-for="day in days" :key="day">{{ day }}</th>
                </thead>
                <tbody class="w-full">
                    <tr v-for="(date, rowIndex) in dates" :key="rowIndex" class="w-full flex">
                        <td v-for="(day, colIndex) in date" :key="colIndex"
                            :class="{
                                'w-20 h-20 flex justify-center items-center': true,
                                'text-gray-400': isPastDay(day),
                                'text-black': !isOutsideMonth(rowIndex, colIndex) && !isToday(day) && !isPastDay(day),
                                'text-black': isOutsideMonth(rowIndex, colIndex) && isToday(day),
                                'selected': clickDay == day ? 'blue' : ''
                            }" @click="handleDateClick(day, rowIndex, colIndex)">
                            <p>{{ day }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<!-- :style="{ 'color': isOutsideMonth(rowIndex, colIndex) ? 'text-gray-400' : (isToday(day) ? 'text-black' : ''), 'selected': clickDay == day ? 'blue' : '' }" -->


<script>
import { ref } from "vue";

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
            clickDay: null,
        };
    },
    created() {
        const date = new Date();
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.year = this.currentYear;
        this.month = this.currentMonth;
        this.today = date.getDate();
        this.calendarData();
    },
    methods: {
        calendarData(arg) {
            if (arg < 0) {
                this.month -= 1;
            } else if (arg === 1) {
                this.month += 1;
            }
            if (this.month === 0) {
                this.year -= 1;
                this.month = 12;
            } else if (this.month > 12) {
                this.year += 1;
                this.month = 1;
            }
            const [monthFirstDay, monthLastDate, lastMonthLastDate] = this.getFirstDayLastDate(
                this.year,
                this.month
            );
            this.dates = this.getMonthOfDays(monthFirstDay, monthLastDate, lastMonthLastDate);
        },
        getFirstDayLastDate(year, month) {
            const firstDay = new Date(year, month - 1, 1).getDay();
            const lastDate = new Date(year, month, 0).getDate();
            let lastYear = year;
            let lastMonth = month - 1;

            if (month === 0) {
                lastMonth = 12;
                lastYear -= 1;
            }

            const prevLastDate = new Date(lastYear, lastMonth, 0).getDate();
            return [firstDay, lastDate, prevLastDate];
        },
        getMonthOfDays(monthFirstDay, monthLastDate, prevMonthLastDate) {
            let day = 1;
            const dates = [];
            let weekOfDays = [];

            while (day <= monthLastDate) {
                if (day === 1 && monthFirstDay !== 0) {
                    for (let j = 0; j < monthFirstDay; j += 1) {
                        weekOfDays.push({ day: null, isOutsideMonth: true });
                    }
                }

                weekOfDays.push({ day: day, isOutsideMonth: false });

                if (weekOfDays.length === 7) {
                    dates.push([...weekOfDays]);
                    weekOfDays = [];
                }

                day += 1;
            }

            if (weekOfDays.length > 0) {
                while (weekOfDays.length < 7) {
                    weekOfDays.push({ day: null, isOutsideMonth: true });
                }
                dates.push([...weekOfDays]);
            }

            return dates.map((week) => week.map((dayInfo) => dayInfo.day));
        },
        isOutsideMonth(rowIndex, colIndex) {
            const firstDayOfMonth = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
            const lastDayOfMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

            return (
                (rowIndex === 0 && colIndex < firstDayOfMonth) ||
                (rowIndex === 5 && colIndex >= lastDayOfMonth) ||
                (rowIndex !== 0 && rowIndex !== 5)
            );
        },

        isToday(day) {
            const today = new Date();
            const currentMonthFirstDay = new Date(this.currentYear, this.currentMonth - 1, 1);
            const lastMonthLastDay = new Date(this.currentYear, this.currentMonth, 0);

            return (
                today.getDate() === day &&
                today.getMonth() + 1 === this.currentMonth &&
                today.getFullYear() === this.currentYear &&
                today >= currentMonthFirstDay &&
                today <= lastMonthLastDay
            );
        },

        isPastDay(day) {
            const today = new Date();
            const currentMonthFirstDay = new Date(this.currentYear, this.currentMonth - 1, 1);
            const lastMonthLastDay = new Date(this.currentYear, this.currentMonth, 0);
            const currentDate = new Date(this.currentYear, this.currentMonth - 1, day);
            // 해당 달을 판단하는 쪽에서 에러

        },

        handleDateClick(day, rowIndex, colIndex) {
            if (!this.isOutsideMonth(rowIndex, colIndex)) {
                const clickedMonth = this.month;
                const clickedYear = this.year;

                this.clickDays[`${clickedYear}-${clickedMonth}`] = day;
                console.log(`클릭한 날짜: ${clickedYear}-${clickedMonth}-${day}`);
            }
        },
    },
};
</script>
