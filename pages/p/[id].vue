<template>
    <main class="w-full px-5 lg:px-0 py-24 flex justify-center text-black-3">
        <div v-if="!states.query || states.query !== '1'" class="max-w-[22.5rem] w-full">
            <div>
                <div>
                    <h2 class="text-2xl font-bold">{{ data.title }}</h2>
                </div>
                <div class="shrink-0 mt-4 flex gap-4">
                    <!-- <div class="w-full h-12">
                        <Button :click="handleReset" color="gray" fill>리셋하기</Button>
                    </div> -->
                    <button v-on:click="handlePopupShow" class="w-fit flex items-center gap-2 mb-1 lg:hover:text-blue-5 duration-200">
                        <i class="bi bi-plus-circle text-sm"></i>
                        시간 선택하기
                    </button>
                    <button v-on:click="copyLink" v-bind:class="`${states.copyLink ? 'text-blue-5' : 'text-black-3'} w-fit flex items-center gap-2 mb-1 lg:hover:text-blue-5 duration-200`">
                        <i v-bind:class="`${states.copyLink ? 'bi bi-check-lg' : 'bi bi-copy'} text-sm`"></i>
                        링크 복사하기
                    </button>
                    <!-- <div class="w-full h-12">
                        <Button :click="handlePopupShow" :icon="'bi bi-calendar-week'" fill>약속 시간 선택</Button>
                    </div> -->
                </div>
                <div class="w-full mt-10">
                    <div class="flex flex-col gap-2 text-sm text-black-3">
                        <h2 class="shrink-0 font-semibold">파티원 {{ states.checkedPartywon.length !== 0 ? `(${states.checkedPartywon.length}/${capacity})` : `(${partywon.length}/${capacity})` }}</h2>
                        <ul v-if="partywon.length > 0" class="flex flex-wrap gap-1.5">
                            <li
                                v-for="thisPartywon in partywon"
                                v-bind:class="`${
                                    states.checkedPartywon.length !== 0 && !states.checkedPartywon.includes(thisPartywon.name)
                                    ? 'border-gray-c text-gray-c'
                                    : 'border-blue-5 text-blue-5'
                                } px-3 py-1 border rounded-lg duration-200`"
                            >
                                {{ thisPartywon.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mt-6 pl-14 flex justify-center items-center text-sm">
                    <div class="flex flex-col items-center gap-0.5">
                        <div v-bind:class="`${dateProp.getDay() === 0 || dateProp.getDay() === 6 ? 'text-red-e' : ''}`">{{ dayIntoWeekday(dateProp.getDay()) }}</div>
                        <div class="font-semibold">{{ (dateProp.getMonth() + 1) + "." + dateProp.getDate() }}</div>
                    </div>
                </div>
                <div class="w-full mt-2">
                    <TimelineView
                        :capacity="capacity"
                        :period="period"
                        :periodBlock="checked_time"
                        :onMouseOver="handleTimelineMouseOver"
                        :onMouseLeave="handleTimelineMouseLeave"
                    />
                </div>
            </div>
        </div>
        <div v-else-if="states.query === '1'">
            <Popup
                :handleClose="handlePopupClose"
                title="약속 시간 선택"
            >
                <div class="w-full max-w-[22.5rem] text-center">
                    <div class="w-full shrink-0">
                        <h2 class="font-bold text-2xl">이름이 무엇인가요?</h2>
                        <h3 class="mt-4 mb-12">이름은 20자 내외로 적어주세요</h3>
                        <input type="text" placeholder="ex) 박티원" v-on:input="handlePopupNameChange" id="user-name" maxlength="20" v-bind:class="`${states.popupNameState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 text-sm border rounded-lg border-gray-9 placeholder-gray-9`"/>
                        <div v-if="states.popupNameState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                            {{ states.popupNameState.msg }}
                        </div>
                    </div>
                    <h2 class="mt-24 font-bold text-2xl">언제 약속에 갈 수 있나요?</h2>
                    <h3 class="mt-4 mb-12">시간은 중복해서 선택할 수 있어요</h3>
                    <TimelineSelect
                        :period="period"
                        :periodBlock="checked_time"
                        :onChange="handlePopupTimeChange"
                        :state="states.popupTimeState"
                        :onStateChange="handlePopupTimeStateChange"
                    />
                    <div class="mt-6 flex gap-2">
                        <div class="w-full h-12">
                            <Button :click="handlePopupCreate" :icon="'bi bi-check-circle'" fill>선택하기</Button>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
        <Toast/>
    </main>
</template>

<script setup lang="ts">
    // Pinia
    import { useToastStore } from '~/stores/toast';
    const toastStore = useToastStore();

    // Firestore
    import { collection, setDoc, doc } from 'firebase/firestore';
    import type { LocationQuery, LocationQueryValue } from '#vue-router';

    // Load firebase collection
    const { firestore } = useFirebase();
    const myCollection = collection(firestore, "posts");

    // Common
    import { dayIntoWeekday } from '~/utils/common';

    // Types
    interface States {
        query: LocationQueryValue | LocationQueryValue[],
        checkedPartywon: string[],
        popupName: string,
        popupNameState: PopupNameState,
        popupTime: number[],
        popupTimeState: PopupTimeState,
        copyLink: boolean,
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

    // Route
    const route = useRoute();
    const router = useRouter();

    // Watch queries
    watch(() => route.query, async () => {
        handleQuery(route.query);
    });
    
    const handleQuery = (query: LocationQuery) => {
        states.query = query.create;
        states.popupName = "";
        states.popupNameState = { type: "", msg: "" };
        states.popupTime = [];
        states.popupTimeState = { type: "", msg: "" };
    }

    // States
    const states: States = reactive({
        query: route.query.create,
        checkedPartywon: [],
        popupName: "",
        popupNameState: { type: "", msg: "" },
        popupTime: [],
        popupTimeState: { type: "", msg: "" },
        copyLink: false,
    });

    // Fetch data
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
        if (!states.copyLink) {
            states.copyLink = true;
            window.navigator.clipboard.writeText(location.toString());
            toastStore.success({ text: "링크가 복사되었어요." });
            setTimeout(() => {
                states.copyLink = false;
            }, 2000);
        }
    }

    /** Show/close popup */
    const handlePopupShow = () => {
        router.push(`/p/${routeId}?create=1`);
    }

    const handlePopupClose = () => {
        router.push(`/p/${routeId}`);
    }

    /** Trigger popup name change event */
    const handlePopupNameChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.popupName = el.value;
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
        const popup = document.getElementById("popup") as HTMLDivElement;

        if (states.popupName === "") {
            states.popupNameState = {
                type: "error",
                msg: "이름은 빈칸으로 남길 수 없어요.",
            };
            popup.scrollTo({ top: 0, behavior: "smooth" });
        } else if (partywon.some((obj: Partywon) => obj.name === states.popupName)) {
            states.popupNameState = {
                type: "error",
                msg: "중복된 이름은 사용할 수 없어요."
            };
            popup.scrollTo({ top: 0, behavior: "smooth" });
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
                handlePopupClose();
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