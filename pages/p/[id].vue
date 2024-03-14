<template>
    <main class="w-full px-5 lg:px-16 pt-20 lg:pt-40 pb-20 tracking-wide leading-relaxed flex justify-center">
        <div class="max-w-[80rem] w-full">
            <div class="w-full flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-0 text-black-3">
                <div class="w-full">
                    <h1 class="mb-2 text-lg lg:text-xl font-medium">타임라인</h1>
                    <p class="text-sm leading-relaxed font-light text-gray-6">
                        타임라인은 파티장이 설정한 시간표에요. <br/>
                        시간 선택하기를 눌러 가능한 시간을 선택해 주세요.
                    </p>
                </div>
                <div class="shrink-0 flex gap-2.5 text-sm lg:text-base font-light">
                    <!-- <Button :click="handleReset" color="gray" fill>리셋하기</button> -->
                    <Button :click="copyLink" :icon="'bi bi-share'" color="gray" fill>링크 복사하기</Button>
                    <Button :click="handlePopupShow" :icon="'bi bi-calendar-week'" fill>시간 선택하기</Button>
                </div>
            </div>
            <div class="mt-16 text-black-3">
                <div class="mb-5 lg:mb-8">
                    <h2 class="mb-2 text-lg lg:text-xl font-medium">{{ data.title }}</h2>
                    <p class="text-sm font-light text-gray-6">{{ dateDesc }}</p>
                </div>
                <div class="w-full flex flex-col-reverse lg:flex-row gap-5 lg:gap-0">
                    <div class="w-full flex flex-col">
                        <TimelineView
                            :capacity="capacity"
                            :period="period"
                            :periodBlock="checked_time"
                            :onMouseOver="handleTimelineMouseOver"
                            :onMouseLeave="handleTimelineMouseLeave"
                        />
                        <div class="w-full pl-12 pt-4 text-xs font-light leading-relaxed text-gray-6">
                            <div class="w-full flex items-center gap-2">
                                <i class="text-[0.188rem] fa-solid fa-circle"></i> 시간은 30분 단위로 생성되고 중복해서 선택할 수 있어요.
                            </div>
                            <div class="w-full mt-1.5 flex items-center gap-2">
                                <i class="text-[0.188rem] fa-solid fa-circle"></i> 일정은 해당 날짜가 지난 후 30일이 지나면 자동으로 폐기돼요.
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-80 shrink-0 lg:ml-4 lg:pb-[3.375rem]">
                        <div class="w-full h-full px-5 lg:px-6 p-6 shrink-0 rounded-md bg-gray-f text-black-3">
                            <h2>파티원{{ states.checkedPartywon.length !== 0 ? " (" + (states.checkedPartywon.length) + '/' + capacity + ')' : '' }}</h2>
                            <ul class="mt-4 text-sm font-light flex flex-col gap-3">
                                <li
                                    v-for="thisPartywon in partywon"
                                    v-bind:class="`${
                                        states.checkedPartywon.length !== 0 && !states.checkedPartywon.includes(thisPartywon.name)
                                        ? 'text-gray-c'
                                        : ''
                                    } duration-200`"
                                >
                                    {{ thisPartywon.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Popup
            :show="states.popupShow"
            :handleShow="handlePopupShow"
            title="시간대 설정"
            subtitle="가능한 시간을 선택해 주세요."
        >
            <div class="text-lg">
                <div class="w-full shrink-0 mt-14">
                    <h2>이름</h2>
                    <div class="text-base font-light mt-3">
                        <Input
                            placeHolder="이름을 입력해 주세요."
                            :onchange="handlePopupNameChange"
                            id="user-name"
                            icon="bi bi-person"
                            :state="states.popupNameState"
                            :onStateChange="handlePopupNameStateChange"
                        />
                    </div>
                </div>
                <h2 class="mt-14 mb-5">시간대 선택</h2>
                <TimelineSelect
                    :period="period"
                    :periodBlock="checked_time"
                    :onChange="handlePopupTimeChange"
                    :state="states.popupTimeState"
                    :onStateChange="handlePopupTimeStateChange"
                />
                <div class="mt-14 text-base font-light flex gap-2.5">
                    <Button :click="handlePopupCreate" :icon="'bi bi-check-circle'" fill>추가하기</Button>
                    <Button :click="handlePopupShow" :icon="'bi bi-x-circle'" color="gray" fill>취소하기</Button>
                </div>
            </div>
        </Popup>
        <Toast/>
    </main>
</template>

<script setup lang="ts">
    // Vue
    import { reactive } from 'vue';

    // Pinia
    import { useToastStore } from '~/stores/toast';
    const toastStore = useToastStore();

    // Components
    import Button from '~/components/Button.vue';
    import Input from '~/components/Input.vue';
    import Popup from '~/components/Popup.vue';
    import Toast from '~/components/Toast.vue';
    import TimelineView from '~/components/TimelineView.vue';
    import TimelineSelect from '~/components/TimelineSelect.vue';

    // Firestore
    import { collection, setDoc, doc } from 'firebase/firestore';

    // Load firebase collection
    const { firestore } = useFirebase();
    const myCollection = collection(firestore, "posts");

    // Types
    interface States {
        checkedPartywon: string[],
        popupShow: boolean,
        popupName: string,
        popupNameState: PopupNameState,
        popupTime: number[],
        popupTimeState: PopupTimeState,
    }

    interface Partywon {
        name: string,
    }

    interface PopupNameState {
        type: string,
        msg: string,
    }

    interface PopupTimeState {
        type: string,
        msg: string,
    }

    // States
    const states: States = reactive({
        checkedPartywon: [],
        popupShow: false,
        popupName: "",
        popupNameState: { type: "", msg: "" },
        popupTime: [],
        popupTimeState: { type: "", msg: "" },
    });

    // Fetch data
    const route = useRoute();
    const routeId = route.params.id + "";
    const { data }: any = await useFetch(`/api/p/${routeId}`);
    const {
        title,
        date,
        start_time,
        end_time,
        email,
        allow_email,
        partywon,
        checked_time,
        capacity,
        allow_capacity,
    } = data.value;

    // Format date
    const dateProp = new Date(date);
    const dateDesc = `${dateProp.getFullYear()}년 ${dateProp.getMonth() + 1}월 ${dateProp.getDate()}일`;

    // Set timeline period
    const period: string[] = [];
    const startPeriod = Number(start_time);
    const endPeriod = Number(end_time);
    const length = Number(endPeriod) - Number(startPeriod);
    for (let i = 0; i < length; i++) {
        period.push(
            startPeriod + i < 12
            ? `${startPeriod + i} AM`
            : startPeriod + i === 12
                ? `${startPeriod + i} PM`
                : `${startPeriod + i - 12} PM`
        );
    }

    /** Trigger timeline mouseover event */
    const handleTimelineMouseOver = (checkedPartywon: any) => {
        states.checkedPartywon = checkedPartywon.checked;
    }

    /** Trigger timeline mouseleave event */
    const handleTimelineMouseLeave = () => {
        states.checkedPartywon = [];
    }

    /** Copy shareable link */
    const copyLink = () => {
        window.navigator.clipboard.writeText(location.toString());
        toastStore.success({ text: "링크가 복사되었어요." });
    }

    /** Show/close popup */
    const handlePopupShow = () => {
        states.popupShow = !states.popupShow;

        // Reset states when popup is closed
        if (states.popupShow) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
            states.popupName = "";
            states.popupNameState = { type: "", msg: "" };
            states.popupTime = [];
            states.popupTimeState = { type: "", msg: "" };
        }
    }

    /** Trigger popup name change event */
    const handlePopupNameChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.popupName = el.value;
        states.popupNameState = { type: "", msg: "" };
    }

    /** Trigger popup name change event */
    const handlePopupNameStateChange = () => {
        states.popupNameState = { type: "", msg: "" };
    }

    /** Trigger popup time change event */
    const handlePopupTimeChange = (arr: number[]) => {
        states.popupTime = arr;
        states.popupTimeState = { type: "", msg: "" };
    }

    /** Trigger popup time state change event */
    const handlePopupTimeStateChange = () => {
        states.popupTimeState = { type: "", msg: "" };
    }

    /** Trigger popup create event */
    const handlePopupCreate = async () => {
        if (states.popupName === "") {
            states.popupNameState = {
                type: "error",
                msg: "이름은 빈칸으로 남길 수 없어요.",
            };
        } else if (partywon.some((obj: Partywon) => obj.name === states.popupName)) {
            states.popupNameState = {
                type: "error",
                msg: "중복된 이름은 사용할 수 없어요."
            };
        } else if (states.popupTime.length === 0) {
            states.popupTimeState = {
                type: "error",
                msg: "가능한 시간대를 선택해 주세요."
            };
        } else {
            try {
                // Set new partywon
                const thisPartywon = partywon;
                thisPartywon.push({ name: states.popupName });

                // Set new time
                const thisCheckedTime = checked_time;
                for (let i = 0; i < thisCheckedTime.length; i++) {
                    if (states.popupTime.includes(thisCheckedTime[i].time)) {
                        thisCheckedTime[i].checked.push(states.popupName);
                    }
                }

                // Update firestore
                await setDoc(doc(myCollection, routeId), {
                    title: title,
                    date: date,
                    start_time: start_time,
                    end_time: end_time,
                    email: email,
                    allow_email: allow_email,
                    partywon: partywon,
                    checked_time: thisCheckedTime,
                    capacity: capacity,
                    allow_capacity: allow_capacity,
                });

                // Close popup
                handlePopupShow();
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleReset = async () => {
        try {
            await setDoc(doc(myCollection, routeId), {
                title: "12/26 풋살하실 분",
                date: "Tue Dec 26 2023",
                start_time: 10,
                end_time: 18,
                email: "partywonguham@gmail.com",
                allow_email: false,
                partywon: [],
                checked_time: [
                    { time: 10, checked: [] },
                    { time: 10.5, checked: [] },
                    { time: 11, checked: [] },
                    { time: 11.5, checked: [] },
                    { time: 12, checked: [] },
                    { time: 12.5, checked: [] },
                    { time: 13, checked: [] },
                    { time: 13.5, checked: [] },
                    { time: 14, checked: [] },
                    { time: 14.5, checked: [] },
                    { time: 15, checked: [] },
                    { time: 15.5, checked: [] },
                    { time: 16, checked: [] },
                    { time: 16.5, checked: [] },
                    { time: 17, checked: [] },
                    { time: 17.5, checked: [] },
                ],
                capacity: 4,
                allow_capacity: true,
            });
            location.reload();
        } catch (err) {
            console.log(err);
        }
    }
</script>