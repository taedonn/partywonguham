<template>
    <main class="w-full py-40 flex justify-center">
        <div class="max-w-[1280px] w-full">
            <div class="w-full flex items-end text-black-333">
                <div class="w-full">
                    <h1 class="mb-3 text-xl leading-none font-medium">타임라인</h1>
                    <p class="text-sm leading-6 font-light">
                        타임라인은 파티장이 설정한 시간표입니다. <br/>
                        시간 선택하기를 눌러 타임라인 내 가능한 시간을 선택해 주세요.
                    </p>
                </div>
                <button class="shrink-0 px-4 py-2 text-base leading-none font-medium rounded-lg border-2 border-blue-4 text-blue-4">시간 선택하기</button>
            </div>
            <div class="mt-16 text-black-333">
                <div class="ml-1.5 pl-40">
                    <h2 class="mb-3 text-xl leading-none font-medium">{{ data.title }}</h2>
                    <p class="text-sm leading-6 font-light">{{ data.date }}</p>
                </div>
                <div class="w-full mt-5 flex">
                    <div class="w-full h-fit flex">
                        <div class="flex flex-col shrink-0 mr-1.5">
                            <div v-for="time in data.timeline" class="w-40 h-14 text-sm font-light flex items-center">{{ time }}</div>
                        </div>
                        <div class="w-full flex flex-col border rounded-lg overflow-hidden border-gray-ccc">
                            <div v-for="checked_time in data.checked_time" class="w-full flex flex-col flex-auto first:border-none odd:border-t border-gray-ccc">
                                <input type="checkbox" v-bind:id="`time-${checked_time.time}`" class="hidden"/>
                                <label
                                    v-bind:for="`time-${checked_time.time}`"
                                    v-bind:style="`opacity: ${checked_time.checked.length / (data.checked_time.length + 1)}`"
                                    class="w-full h-full bg-blue-4"
                                ></label>
                            </div>
                        </div>
                    </div>
                    <div class="w-80 p-5 ml-5 shrink-0 rounded-lg bg-blue-4/10 text-black-333 fill-black-333">
                        <h2>파티원 ({{ (data.partywon.length + 1) + '/' + data.capacity }})</h2>
                        <ul class="mt-4 text-sm font-light flex flex-col gap-3">
                            <li class="flex items-center">
                                {{ data.partyjang.name }}(파티장)
                                <svg class="w-3.5 ml-1" xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
                            </li>
                            <li v-for="partywon in data.partywon">{{ partywon.name }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            data: {},
        }
    },
    methods: {
        async fetchData() {
            const data = {
                id: '5D23E8',
                title: '12/26 풋살하실 분',
                date: 'Tue Dec 26 2023',
                start_time: 10,
                end_time: 15,
                partyjang: {
                    name: '홍길동',
                    email: 'partywonguham@gmail.com',
                },
                partywon: [
                    { name: '이말갑' },
                    { name: '이말을' },
                    { name: '이말병' },
                    { name: '이말정' },
                ],
                checked_time: [
                    { time: 10, checked: ['이말갑', '이말을', '이말병'] },
                    { time: 10.5, checked: ['이말갑', '이말을'] },
                    { time: 11, checked: ['이말갑', '이말을'] },
                    { time: 11.5, checked: ['이말갑', '이말을', '이말병', '이말정'] },
                    { time: 12, checked: [] },
                    { time: 12.5, checked: ['이말갑'] },
                    { time: 13, checked: [] },
                    { time: 13.5, checked: ['이말갑'] },
                    { time: 14, checked: ['이말갑', '이말을'] },
                    { time: 14.5, checked: ['이말갑'] },
                ],
                capacity: 6,
            }

            // 날짜 포맷
            const newDate = new Date(data.date);
            data.date = `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;

            // 타임라인 생성을 위한 날짜 반복문
            const timeline = [
                data.start_time < 11 
                    ? `오전 ${data.start_time >= 10 ? data.start_time : '0' + data.start_time}:00 ~ 오전 ${data.start_time + 1 >= 10 ? data.start_time + 1 : '0' + (data.start_time + 1)}:00` 
                    : data.start_time === 11
                        ? '오전 11:00 ~ 오후 12:00'
                        : `오후 ${data.start_time >= 10 ? data.start_time : '0' + data.start_time}:00 ~ 오후 ${data.start_time + 1 >= 10 ? data.start_time + 1 : '0' + (data.start_time + 1)}:00`
            ]
            const timelineLength = data.end_time - data.start_time;
            for (let i = 0; i < timelineLength - 1; i++) {
                let hour = Number(timeline[i].split(' ~ ')[1].split(':')[0].split(' ')[1]);
                let meridiem = timeline[i].split(' ~ ')[1].split(':')[0].split(' ')[0];
                timeline.push(`${
                    meridiem === '오전'
                        ? hour === 11
                            ? '오전 11:00 ~ 오후 12:00'
                            : `오전 ${hour >= 10 ? hour : '0' + hour}:00 ~ 오전 ${hour + 1 >= 10 ? hour + 1 : '0' + (hour + 1)}:00`
                        : hour === 12
                            ? '오후 12:00 ~ 오후 01:00'
                            : `오후 ${hour >= 10 ? hour : '0' + hour}:00 ~ 오후 ${hour + 1 >= 10 ? hour + 1 : '0' + (hour + 1)}:00`
                }`);
            }
            const newData = { ...data, timeline };

            this.data = newData;
        }
    },
    created() {
        this.fetchData();
    }
}
</script>

<style>

</style>