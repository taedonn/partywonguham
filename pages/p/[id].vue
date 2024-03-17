<template>
    <main class="w-full px-5 lg:px-16 pt-28 lg:pt-40 pb-20 flex justify-center text-black-3">
        <div class="max-w-[48rem] w-full">
            <div>
                <div>
                    <h2 class="mb-2 text-lg lg:text-xl font-bold">{{ data.title }}</h2>
                    <p class="text-sm text-gray-6">{{ dateDesc }}</p>
                </div>
                <div class="shrink-0 mt-5 lg:mt-8 flex gap-2 text-sm lg:text-base">
                    <!-- <div class="w-1/2 h-12">
                        <Button :click="handleReset" color="gray" fill>리셋하기</Button>
                    </div> -->
                    <div class="w-1/2 h-12">
                        <Button :click="copyLink" :icon="'bi bi-share'" color="gray" fill>링크 복사하기</Button>
                    </div>
                    <div class="w-1/2 h-12">
                        <Button :click="handlePopupShow" :icon="'bi bi-calendar-week'" fill>약속 시간 선택</Button>
                    </div>
                </div>
                <div class="w-full mt-2">
                    <div class="px-6 py-4 flex flex-col lg:flex-row gap-3 rounded-lg text-sm bg-gray-f text-black-3">
                        <h2 class="shrink-0 font-semibold">파티원 {{ states.checkedPartywon.length !== 0 ? `(${states.checkedPartywon.length}/${capacity})` : `(${capacity}/${capacity})` }}</h2>
                        <ul class="flex flex-wrap gap-2">
                            <li
                                v-for="thisPartywon, idx in partywon"
                                v-bind:class="`${
                                    states.checkedPartywon.length !== 0 && !states.checkedPartywon.includes(thisPartywon.name)
                                    ? 'text-gray-c'
                                    : ''
                                } duration-200`"
                            >
                                {{ idx < partywon.length - 1 ? thisPartywon.name + "," : thisPartywon.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-full mt-8 flex flex-col-reverse lg:flex-row gap-5 lg:gap-0">
                    <div class="w-full flex flex-col">
                        <TimelineView
                            :capacity="capacity"
                            :period="period"
                            :periodBlock="checked_time"
                            :onMouseOver="handleTimelineMouseOver"
                            :onMouseLeave="handleTimelineMouseLeave"
                        />
                        <div class="w-full pt-4 text-xs text-gray-6">
                            <div class="w-full flex items-center gap-2">
                                <i class="text-[0.188rem] fa-solid fa-circle"></i> 시간은 30분 단위로 생성되고 중복해서 선택할 수 있어요.
                            </div>
                            <div class="w-full mt-2 flex items-center gap-2">
                                <i class="text-[0.188rem] fa-solid fa-circle"></i> 일정은 해당 날짜가 지난 후 30일이 지나면 자동으로 폐기돼요.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Popup
            :show="states.popupShow"
            :handleShow="handlePopupShow"
            title="약속 시간 선택"
        >
            <div class="w-full max-w-[22.5rem] text-sm text-center">
                <div class="w-full shrink-0">
                    <h2 class="font-bold text-2xl">이름이 무엇인가요?</h2>
                    <h3 class="mt-4 mb-12">이름은 20자 내외로 적어주세요</h3>
                    <!-- <div class="text-base mt-3">
                        <Input
                            placeHolder="이름을 입력해 주세요."
                            :onchange="handlePopupNameChange"
                            id="user-name"
                            icon="bi bi-person"
                            :state="states.popupNameState"
                            :onStateChange="handlePopupNameStateChange"
                        />
                    </div> -->
                    <input type="text" placeholder="홍길동" v-on:change="handlePopupNameChange" id="user-name" class="w-full px-4 py-2.5 text-sm border rounded-lg border-gray-9 placeholder-gray-9"/>
                </div>
                <h2 class="mt-24 font-bold text-2xl">언제 약속에 갈 수 있나요?</h2>
                <h3 class="mt-4 mb-12">시간대는 중복해서 선택할 수 있어요</h3>
                <TimelineSelect
                    :period="period"
                    :periodBlock="checked_time"
                    :onChange="handlePopupTimeChange"
                    :state="states.popupTimeState"
                    :onStateChange="handlePopupTimeStateChange"
                />
                <div class="mt-6 text-sm lg:text-base flex gap-2">
                    <div class="w-full h-12">
                        <Button :click="handlePopupCreate" :icon="'bi bi-check-circle'" fill>선택하기</Button>
                    </div>
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