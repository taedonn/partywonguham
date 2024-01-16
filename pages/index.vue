<template>
    <main class="w-full px-5 py-40 flex justify-center">
        <div class="max-w-[80rem] w-full">
            <div class="w-full flex items-end text-black-333">
                <div class="w-full">
                    <h1 class="mb-3 text-xl leading-none font-medium">타임라인</h1>
                    <p class="text-sm leading-6 font-light text-gray-666">
                        타임라인은 파티장이 설정한 시간표입니다. <br/>
                        시간 선택하기를 눌러 타임라인 내 가능한 시간을 선택해 주세요.
                    </p>
                </div>
                <Button :click="store.setShow" :icon="'fa-regular fa-paper-plane'">시간 선택하기</Button>
            </div>
            <div class="mt-16 text-black-333">
                <div class="pl-36">
                    <h2 class="mb-3 text-xl leading-none font-medium">{{ data.title }}</h2>
                    <p class="text-sm leading-6 font-light text-gray-666">{{ data.date }}</p>
                </div>
                <div class="w-full mt-5 flex">
                    <Timeline
                        :timeline="timeline"
                        :checked_time="data.checked_time"
                    />
                    <div class="w-80 shrink-0 ml-4 pb-[3.125rem]">
                        <div class="w-full h-full px-4 py-5 shrink-0 border border-gray-ccc text-black-333">
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
                <div class="w-52 shrink-0 mt-14">
                    <h2>이름</h2>
                    <div class="mt-4">
                        <Input
                            placeHolder="이름을 입력해 주세요."
                        />
                    </div>
                </div>
                <h2 class="mt-14 mb-4">시간대 선택</h2>
                <Timeline
                    blank
                    :timeline="timeline"
                    :checked_time="data.checked_time"
                />
                <div class="mt-14">
                    <Button :click="store.setShow" :icon="'fa-regular fa-paper-plane'">타임라인 추가</Button>
                </div>
            </div>
        </Popup>
    </main>
</template>

<script setup lang="ts">
// pinia
import { usePopupStore } from '~/stores/popup';
const store = usePopupStore();

// components
import Button from '~/components/Button.vue';
import Input from '~/components/Input.vue';
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