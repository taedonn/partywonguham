<template>
    <main class="w-full py-40 flex justify-center">
        <div class="max-w-[1280px] w-full">
            <div class="w-full flex items-end text-black-333">
                <div class="w-full">
                    <h1 class="mb-3 text-xl leading-none font-medium">타임라인</h1>
                    <p class="text-sm leading-6 font-light text-gray-666">
                        타임라인은 파티장이 설정한 시간표입니다. <br/>
                        시간 선택하기를 눌러 타임라인 내 가능한 시간을 선택해 주세요.
                    </p>
                </div>
                <button @click="store.setShow" class="shrink-0 px-4 py-2 text-base leading-none font-medium rounded-lg border-2 border-blue-4 text-blue-4">시간 선택하기</button>
            </div>
            <div class="mt-16 text-black-333">
                <div class="ml-1.5 pl-40">
                    <h2 class="mb-3 text-xl leading-none font-medium">{{ data.title }}</h2>
                    <p class="text-sm leading-6 font-light text-gray-666">{{ data.date }}</p>
                </div>
                <div class="w-full mt-5 flex">
                    <Timeline
                        :timeline="timeline"
                        :checked_time="data.checked_time"
                    />
                    <div class="w-80 shrink-0 ml-4 pb-[52px]">
                        <div class="w-full h-full p-5 shrink-0 border border-blue-3 bg-blue-4/10 text-black-333 fill-black-333">
                            <h2>파티원 ({{ (data.partywon.length + 1) + '/' + data.capacity }})</h2>
                            <ul class="mt-4 text-sm font-light flex flex-col gap-3">
                                <li class="flex items-center">
                                    {{ data.partyjang.name }} (파티장)
                                </li>
                                <li v-for="partywon in data.partywon">{{ partywon.name }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Popup
            :show="store.show"
            :handleShow="store.setShow"
            title="시간대 설정"
            subtitle="가능한 시간을 선택해 주세요."
        >
            <div>
                <div class="w-48 shrink-0 mb-8">
                    <h2>이름</h2>
                    <input
                        type="text"
                        placeholder="이름을 입력해 주세요."
                        class="w-full p-2 mt-3 text-sm font-light border-b border-gray-ccc text-black-333 placeholder-gray-999"
                    />
                </div>
                <Timeline
                    blank
                    :timeline="timeline"
                    :checked_time="data.checked_time"
                />
                <button @click="store.setShow" class="mt-8 px-4 py-2 leading-none rounded-lg border-2 border-blue-4 text-blue-4">타임라인 추가</button>
            </div>
        </Popup>
    </main>
</template>

<script setup lang="ts">
// pinia
import { usePopupStore } from '~/stores/popup';
const store = usePopupStore();

// components
import Timeline from '~/components/Timeline.vue';
import Popup from '~/components/Popup.vue';

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
        { time: 13.5, checked: [] },
        { time: 14, checked: ['이말갑', '이말을'] },
        { time: 14.5, checked: ['이말갑'] },
    ],
    capacity: 6,
}
const { start_time, end_time } = data;

// 날짜 포맷
const date = new Date(data.date);
data.date = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

// 타임라인 생성을 위한 날짜 반복문
const timeline = [
    start_time < 11 
        ? `오전 ${start_time >= 10 ? start_time : '0' + start_time}:00 ~ 오전 ${start_time + 1 >= 10 ? start_time + 1 : '0' + (start_time + 1)}:00` 
        : start_time === 11
            ? '오전 11:00 ~ 오후 12:00'
            : `오후 ${start_time >= 10 ? start_time : '0' + start_time}:00 ~ 오후 ${start_time + 1 >= 10 ? start_time + 1 : '0' + (start_time + 1)}:00`
]
const timelineLength = end_time - start_time;
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
</script>

<style>

</style>