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
                    <div class="flex flex-col shrink-0 mr-1.5">
                        <div v-for="time in data.timeline" class="w-40 h-12 text-sm font-light flex items-center">{{ time }}</div>
                    </div>
                    <div class="w-full flex flex-col border rounded-lg border-gray-ccc">

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
                title: '11/23 풋살하실 분',
                date: '2023년 11/23일',
                start_time: 'Tue Dec 26 2023 08:00:00',
                end_time: 'Tue Dec 26 2023 13:00:00',
            }

            // 날짜 포맷
            data.start_time = new Date(data.start_time);
            data.end_time = new Date(data.end_time);

            // 타임라인 생성을 위한 날짜 반복문
            const timeline = [
                data.start_time.getHours() < 11 
                    ? `오전 ${data.start_time.getHours() === 10 ? data.start_time.getHours() : '0' + data.start_time.getHours()}:00 ~ 오전 ${data.start_time.getHours() + 1 === 10 ? data.start_time.getHours() + 1 : '0' + (data.start_time.getHours() + 1)}:00` 
                    : data.start_time.getHours() === 11
                        ? `오전 11:00 ~ 오후 12:00`
                        : `오후 ${data.start_time.getHours() >= 10 ? data.start_time.getHours() : '0' + data.start_time.getHours()}:00 ~ 오후 ${data.start_time.getHours() + 1 >= 10 ? data.start_time.getHours() + 1 : '0' + (data.start_time.getHours() + 1)}:00`
            ]
            const timelineLength = data.end_time.getHours() - data.start_time.getHours();
            for (let i = 0; i < timelineLength; i++) {
                let hour = Number(timeline[i].split(' ~ ')[1].split(':')[0].split(' ')[1]);
                let meridiem = timeline[i].split(' ~ ')[1].split(':')[0].split(' ')[0];
                timeline.push(`${
                    meridiem === '오전'
                        ? hour === 11
                            ? `오전 11:00 ~ 오후 12:00`
                            : `오전 ${hour >= 10 ? hour : '0' + hour}:00 ~ 오전 ${hour + 1 >= 10 ? hour + 1 : '0' + (hour + 1)}:00`
                        : hour === 12
                            ? `오후 12:00 ~ 오후 01:00`
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