<script setup lang="ts">
    // Pinia
    import { usePopupStore } from '~/stores/popup';
    const popupStore = usePopupStore();
    import { useToastStore } from '~/stores/toast';
    const toastStore = useToastStore();

    // Components
    import Button from '~/components/Button.vue';
    import Input from '~/components/Input.vue';
    import Timeline from '~/components/Timeline.vue';
    import Popup from '~/components/Popup.vue';
    import Toast from '~/components/Toast.vue';

    // Fetch data
    const route = useRoute();
    const { data }: any = await useFetch(`/api/p/${route.params.id}`);
    const { start_time, end_time, date } = data.value;

    // Format date
    const dateProp = new Date(date);
    const dateDesc = `${dateProp.getFullYear()}년 ${dateProp.getMonth() + 1}월 ${dateProp.getDate()}일`;

    // Set timeline
    const timeline: string[] = [];
    const startTime = Number(start_time);
    const endTime = Number(end_time);
    const length = Number(endTime) - Number(startTime);
    for (let i = 0; i < length; i++) {
        timeline.push(
            startTime + i < 12
            ? `${startTime + i} AM`
            : startTime + i === 12
                ? `${startTime + i} PM`
                : `${startTime + i - 12} PM`
        );
    }

    // Copy shareable link
    const copyLink = () => {
        window.navigator.clipboard.writeText(location.toString());
        toastStore.success({ text: "링크가 복사되었어요." });
    }
</script>

<template>
    <main class="w-full px-5 py-40 flex justify-center">
        <div class="max-w-[80rem] w-full">
            <div class="w-full flex items-end text-black-333">
                <div class="w-full">
                    <h1 class="mb-3 text-xl leading-none font-medium">타임라인</h1>
                    <p class="text-sm leading-6 font-light text-gray-666">
                        타임라인은 파티장이 설정한 시간표에요. <br/>
                        시간 선택하기를 눌러 타임라인 내 가능한 시간을 선택해 주세요.
                    </p>
                </div>
                <div class="shrink-0 flex gap-2.5 text-base">
                    <Button :click="copyLink" :icon="'fa-solid fa-share-nodes'" color="gray">링크 복사하기</Button>
                    <Button :click="popupStore.setShow" :icon="'fa-regular fa-paper-plane'">시간 선택하기</Button>
                </div>
            </div>
            <div class="mt-16 text-black-333">
                <div class="mb-8">
                    <h2 class="mb-2 text-xl font-medium">{{ data.title }}</h2>
                    <p class="text-sm font-light text-gray-666">{{ dateDesc }}</p>
                </div>
                <div class="w-full flex">
                    <Timeline
                        :timeline="timeline"
                        :checked_time="data.checked_time"
                    />
                    <div class="w-80 shrink-0 ml-4 pb-[3.375rem]">
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
            :show="popupStore.show"
            :handleShow="popupStore.setShow"
            title="시간대 설정"
            subtitle="가능한 시간을 선택해 주세요."
        >
            <div class="text-lg">
                <div class="w-full shrink-0 mt-14">
                    <h2>이름</h2>
                    <div class="mt-3">
                        <Input
                            placeHolder="이름을 입력해 주세요."
                            icon="fa-solid fa-user-pen"
                        />
                    </div>
                </div>
                <h2 class="mt-14 mb-5">시간대 선택</h2>
                <Timeline
                    blank
                    :timeline="timeline"
                    :checked_time="data.checked_time"
                />
                <div class="mt-14 text-base flex gap-2.5">
                    <Button :click="popupStore.setShow" :icon="'fa-regular fa-paper-plane'">추가하기</Button>
                    <Button :click="popupStore.setShow" :icon="'fa-solid fa-xmark'" color="gray">취소하기</Button>
                </div>
            </div>
        </Popup>
        <Toast/>
    </main>
</template>