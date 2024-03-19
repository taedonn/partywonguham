<template>
    <main v-if="!states.query || states.query !== '1'" class="w-full px-5 lg:px-0 pt-12 lg:pt-24 pb-24 flex justify-center text-black-3">
        <div class="max-w-[22.5rem] w-full">
            <div>
                <div>
                    <h2 class="text-2xl font-bold">{{ data.title }}</h2>
                </div>
                <div class="shrink-0 mt-4 flex gap-4">
                    <!-- <button v-on:click="handleReset" class="w-fit flex items-center gap-2 mb-1 lg:hover:text-blue-5 duration-200">
                        <i class="bi bi-plus-circle text-sm"></i>
                        리셋하기
                    </button> -->
                    <button v-on:click="handlePopupShow" class="w-fit flex items-center gap-2 mb-1 lg:hover:text-blue-5 duration-200">
                        <i class="bi bi-plus-circle text-sm"></i>
                        시간 선택하기
                    </button>
                    <button v-on:click="copyLink" v-bind:class="`${states.copyLink ? 'text-blue-5' : 'text-black-3'} w-fit flex items-center gap-2 mb-1 lg:hover:text-blue-5 duration-200`">
                        <i v-bind:class="`${states.copyLink ? 'bi bi-check-lg' : 'bi bi-copy'} text-sm`"></i>
                        링크 복사하기
                    </button>
                </div>
                <div class="w-full mt-10">
                    <div class="flex flex-col gap-2 text-sm text-black-3">
                        <h2 class="shrink-0 font-semibold">파티원 {{ states.selectedPartywons.length !== 0 ? `(${states.selectedPartywons.length}/${capacity})` : `(${partywons.length}/${capacity})` }}</h2>
                        <ul v-if="partywons.length > 0" class="flex flex-wrap gap-1.5">
                            <li
                                v-for="partywon in partywons"
                                v-bind:class="`${
                                    states.selectedPartywons.length !== 0 && !states.selectedPartywons.includes(partywon.name)
                                    ? 'border-gray-c text-gray-c'
                                    : 'border-blue-5 text-blue-5'
                                } px-3 py-1 border rounded-lg duration-200`"
                            >
                                {{ partywon.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-full mt-4">
                    <TimelineView
                        :capacity="capacity"
                        :datesArr="datesArr"
                        :dates="dates"
                        :times="times"
                        :tables="tables"
                        :onCheck="handleTimelineCheck"
                        :onUncheck="handleTimelineUncheck"
                    />
                </div>
            </div>
        </div>
        <Toast/>
    </main>
    <main v-else-if="states.query === '1'" class="w-full px-5 lg:px-0 py-20 lg:py-24 text-black-3">
        <Popup
            :handleClose="handlePopupClose"
            title="약속 시간 선택"
        >
            <div class="w-full max-w-[22.5rem] text-center">
                <div class="w-full shrink-0">
                    <h2 class="font-bold text-2xl">파티원님을 어떻게 부르면 되나요?</h2>
                    <h3 class="mt-4 mb-12">이름은 20자 내외로 적어주세요</h3>
                    <input type="text" placeholder="ex) 박티원" v-on:input="handlePopupNameChange" id="user-name" maxlength="20" v-bind:class="`${states.popupNameState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 text-sm border rounded-lg border-gray-9 placeholder-gray-9`"/>
                    <div v-if="states.popupNameState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                        {{ states.popupNameState.msg }}
                    </div>
                </div>
                <h2 class="mt-24 font-bold text-2xl">언제 약속을 잡을까요?</h2>
                <h3 class="mt-4 mb-12">시간은 드래그해서 선택할 수 있어요</h3>
                <TimelineSelect
                    :datesArr="datesArr"
                    :dates="dates"
                    :times="times"
                    :tables="tables"
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

    // Types
    interface States {
        query: LocationQueryValue | LocationQueryValue[],
        selectedPartywons: string[],
        popupName: string,
        popupNameState: PopupNameState,
        popupTime: number[][],
        popupTimeState: PopupTimeState,
        copyLink: boolean
    }

    interface Partywons {
        name: string
    }

    interface Times {
        time: number,
        selected: string[]
    }

    interface PopupNameState {
        type: string,
        msg: string
    }

    interface PopupTimeState {
        type: string,
        msg: string
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
        selectedPartywons: [],
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
        dates,
        start_time,
        end_time,
        email,
        allow_email,
        partywons,
        tables,
        capacity,
        allow_capacity
    } = data.value;

    /** Set date array */
    const datesArr: Date[] = [];
    dates.map((eachDate: string) => {
        datesArr.push(new Date(eachDate));
    });

    /** Set time array */
    const handleTimeArr = (startTime: number, endTime: number) => {
        let arr: number[] = [];
        let diff = endTime - startTime;
        let time = startTime;
        for (let i = 0; i < diff; i++) {
            arr.push(time + i);
        }
        return arr;
    }
    const times: number[] = handleTimeArr(start_time, end_time);

    /** Trigger timeline mouseover event */
    const handleTimelineCheck = (times: Times) => {
        states.selectedPartywons = times.selected;
    }

    /** Trigger timeline mouseleave event */
    const handleTimelineUncheck = () => {
        states.selectedPartywons = [];
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
    const handlePopupTimeChange = (arr: number[][]) => {
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
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (partywons.some((obj: Partywons) => obj.name === states.popupName)) {
            states.popupNameState = {
                type: "error",
                msg: "중복된 이름은 사용할 수 없어요."
            };
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (states.popupTime.length === 0) {
            states.popupTimeState = {
                type: "error",
                msg: "가능한 시간대를 선택해 주세요."
            };
        } else {
            try {
                // Set new partywon
                const thisPartywon = partywons;
                thisPartywon.push({ name: states.popupName });

                // Set new time
                const thisTables = tables;
                for (let i = 0; i < thisTables.length; i++) {
                    for (let j = 0; j < thisTables[i].times.length; j++) {
                        if (states.popupTime[i].includes(thisTables[i].times[j].time)) {
                            thisTables[i].times[j].selected.push(states.popupName);
                        }
                    }
                }

                // Update firestore
                await setDoc(doc(myCollection, routeId), {
                    title: title,
                    dates: dates,
                    start_time: start_time,
                    end_time: end_time,
                    email: email,
                    allow_email: allow_email,
                    partywons: partywons,
                    tables: thisTables,
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
                dates: [
                    'Tue Dec 26 2023',
                    'Wed Dec 27 2023',
                    'Wed Dec 28 2023',
                ],
                start_time: 10,
                end_time: 15,
                email: "partywonguham@gmail.com",
                allow_email: false,
                partywons: [],
                tables: [
                    {
                        times: [
                            { time: 10, selected: [] },
                            { time: 10.5, selected: [] },
                            { time: 11, selected: [] },
                            { time: 11.5, selected: [] },
                            { time: 12, selected: [] },
                            { time: 12.5, selected: [] },
                            { time: 13, selected: [] },
                            { time: 13.5, selected: [] },
                            { time: 14, selected: [] },
                            { time: 14.5, selected: [] },
                        ]
                    },
                    {
                        times: [
                            { time: 10, selected: [] },
                            { time: 10.5, selected: [] },
                            { time: 11, selected: [] },
                            { time: 11.5, selected: [] },
                            { time: 12, selected: [] },
                            { time: 12.5, selected: [] },
                            { time: 13, selected: [] },
                            { time: 13.5, selected: [] },
                            { time: 14, selected: [] },
                            { time: 14.5, selected: [] },
                        ]
                    },
                    {
                        times: [
                            { time: 10, selected: [] },
                            { time: 10.5, selected: [] },
                            { time: 11, selected: [] },
                            { time: 11.5, selected: [] },
                            { time: 12, selected: [] },
                            { time: 12.5, selected: [] },
                            { time: 13, selected: [] },
                            { time: 13.5, selected: [] },
                            { time: 14, selected: [] },
                            { time: 14.5, selected: [] },
                        ]
                    }
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