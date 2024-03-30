<template>
    <main class="w-full flex justify-center px-5 lg:px-0 py-24 text-black-3">
        <ProgressBar
            :step="!states.query ? 0 : Number(states.query) - 1"
            :total="states.allowCapacity ? 4 : 3"
        />
        <div
            v-if="!states.query && states.query !== '2' && states.query !== '3' && states.query !== '4' && states.query !== '5'"
            class="w-full max-w-[22.5rem]"
        >
            <SubPage
                :handleClose="handleStepBack"
                title="제목 설정"
            >
                <div class="w-full text-center">
                    <h2 class="font-bold text-2xl leading-normal">
                        어떤 약속인가요?
                    </h2>
                    <h3 class="mt-4 mb-10 leading-normal">20자 이내로 적어주세요</h3>
                    <input type="text" placeholder="ex) 6월 첫째주 주말 스터디" v-bind:value="states.title" v-on:input="handleTitleChange" id="title" ref="title" maxlength="20" v-bind:class="`${states.titleState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 placeholder-gray-9`"/>
                    <div v-if="states.titleState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                        {{ states.titleState.msg }}
                    </div>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward">다음으로</Button>
                    </div>
                </div>
            </SubPage>
        </div>
        <div
            v-if="states.query === '2'"
            class="w-full max-w-[22.5rem]"
        >
            <SubPage
                :handleClose="handleStepBack"
                title="인원수 설정"
            >
                <div class="w-full text-center">
                    <h2 class="font-bold text-2xl leading-normal">
                        몇 명이 참석하나요?
                    </h2>
                    <h3 class="mt-4 mb-10 leading-normal">참석 인원을 정하시면 인원수가 <br/>채워질 때 알림을 받을 수 있어요</h3>
                    <input type="number" placeholder="ex) 4" v-bind:value="states.capacity" v-bind:disabled="!states.allowCapacity" v-on:input="handleCapacityChange" id="capacity" ref="capacity" v-bind:class="`${states.capacityState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 disabled:border-gray-c placeholder-gray-9`"/>
                    <div v-if="states.capacityState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                        {{ states.capacityState.msg }}
                    </div>
                    <div class="w-full mt-2 flex items-center gap-2">
                        <input type="checkbox" id="allow-capacity" v-on:change="handleCapacityCheck" v-bind:checked="!states.allowCapacity" class="peer hidden"/>
                        <label for="allow-capacity" class="group w-full h-11 px-4 gap-2 flex items-center cursor-pointer rounded-lg border border-gray-6 peer-checked:border-orange-f6 selection:bg-transparent">
                            <div class="text-lg">
                                <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                                <i class="peer-checked:group-[]:block hidden text-orange-f6 fa-solid fa-square-check"></i>
                            </div>
                            상관 없어요.
                        </label>
                    </div>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward">다음으로</Button>
                    </div>
                </div>
            </SubPage>
        </div>
        <div
            v-if="states.query === '3'"
            class="w-full max-w-[22.5rem]"
        >
            <SubPage
                :handleClose="handleStepBack"
                title="날짜 선택"
            >
                <div class="w-full text-center">
                    <h2 class="font-bold text-2xl leading-normal">
                        몇 일에 약속을 잡을까요?
                    </h2>
                    <h3 class="mt-4 mb-10 leading-normal">대략적인 날짜를 정해주세요</h3>
                    <div v-bind:class="`${states.datesState.type === 'error' ? 'animate-shake' : ''} w-full`">
                        <VueDatePicker
                            v-model="date"
                            inline
                            multi-dates
                            @internal-model-change="handleInternal"
                            :day-names="['월', '화', '수', '목', '금', '토', '일']"
                        >
                            <template #month="{ value }">
                                {{
                                    value === 0 ? '1월'
                                    : value === 1 ? '2월'
                                    : value === 2 ? '3월'
                                    : value === 3 ? '4월'
                                    : value === 4 ? '5월'
                                    : value === 5 ? '6월'
                                    : value === 6 ? '7월'
                                    : value === 7 ? '8월'
                                    : value === 8 ? '9월'
                                    : value === 9 ? '10월'
                                    : value === 10 ? '11월'
                                    : '12월'
                                }}
                            </template>
                            <template #month-overlay-value="{ value }">
                                {{
                                    value === 0 ? '1월'
                                    : value === 1 ? '2월'
                                    : value === 2 ? '3월'
                                    : value === 3 ? '4월'
                                    : value === 4 ? '5월'
                                    : value === 5 ? '6월'
                                    : value === 6 ? '7월'
                                    : value === 7 ? '8월'
                                    : value === 8 ? '9월'
                                    : value === 9 ? '10월'
                                    : value === 10 ? '11월'
                                    : '12월'
                                }}
                            </template>
                        </VueDatePicker>
                    </div>
                    <div v-if="states.datesState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                        {{ states.datesState.msg }}
                    </div>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward">다음으로</Button>
                    </div>
                </div>
            </SubPage>
        </div>
        <div
            v-if="states.query === '4'"
            class="w-full max-w-[22.5rem]"
        >
            <SubPage
                :handleClose="handleStepBack"
                title="시간 선택"
            >
                <div class="w-full text-center">
                    <h2 class="font-bold text-2xl leading-normal">
                        어느 시간대로 할까요?
                    </h2>
                    <h3 class="mt-4 mb-10 leading-normal">대략적인 시간대를 정해주세요</h3>
                    <div class="w-full mt-2 flex items-center gap-2">
                        <input type="radio" name="time" id="time-default" value="default" v-on:change="handleTime" v-bind:checked="states.checkedTime === 'default'" class="peer hidden"/>
                        <label for="time-default" class="group w-full h-11 px-4 gap-2 flex items-center cursor-pointer rounded-lg border border-gray-6 peer-checked:border-orange-f6 selection:bg-transparent">
                            <div class="text-lg">
                                <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                                <i class="peer-checked:group-[]:block hidden text-orange-f6 fa-solid fa-square-check"></i>
                            </div>
                            &#127970;기본 [오전 9시 ~ 오후 6시]
                        </label>
                    </div>
                    <div class="w-full mt-2 flex items-center gap-2">
                        <input type="radio" name="time" id="time-morning" value="morning" v-on:change="handleTime" v-bind:checked="states.checkedTime === 'morning'" class="peer hidden"/>
                        <label for="time-morning" class="group w-full h-11 px-4 gap-2 flex items-center cursor-pointer rounded-lg border border-gray-6 peer-checked:border-orange-f6 selection:bg-transparent">
                            <div class="text-lg">
                                <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                                <i class="peer-checked:group-[]:block hidden text-orange-f6 fa-solid fa-square-check"></i>
                            </div>
                            &#9925;오전 [오전 8시 ~ 오후 12시]
                        </label>
                    </div>
                    <div class="w-full mt-2 flex items-center gap-2">
                        <input type="radio" name="time" id="time-afternoon" value="afternoon" v-on:change="handleTime" v-bind:checked="states.checkedTime === 'afternoon'" class="peer hidden"/>
                        <label for="time-afternoon" class="group w-full h-11 px-4 gap-2 flex items-center cursor-pointer rounded-lg border border-gray-6 peer-checked:border-orange-f6 selection:bg-transparent">
                            <div class="text-lg">
                                <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                                <i class="peer-checked:group-[]:block hidden text-orange-f6 fa-solid fa-square-check"></i>
                            </div>
                            &#127774;오후 [오후 12시 ~ 오후 6시]
                        </label>
                    </div>
                    <div class="w-full mt-2 flex items-center gap-2">
                        <input type="radio" name="time" id="time-night" value="night" v-on:change="handleTime" v-bind:checked="states.checkedTime === 'night'" class="peer hidden"/>
                        <label for="time-night" class="group w-full h-11 px-4 gap-2 flex items-center cursor-pointer rounded-lg border border-gray-6 peer-checked:border-orange-f6 selection:bg-transparent">
                            <div class="text-lg">
                                <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                                <i class="peer-checked:group-[]:block hidden text-orange-f6 fa-solid fa-square-check"></i>
                            </div>
                            &#127769;저녁 [오후 6시 ~ 오전 12시]
                        </label>
                    </div>
                    <div class="w-full mt-2 flex items-center gap-2">
                        <input type="radio" name="time" id="time-select" value="select" v-on:change="handleTime" v-bind:checked="states.checkedTime === 'select'" class="peer hidden"/>
                        <label for="time-select" class="group w-full h-11 px-4 gap-2 flex items-center cursor-pointer rounded-lg border border-gray-6 peer-checked:border-orange-f6 selection:bg-transparent">
                            <div class="text-lg">
                                <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                                <i class="peer-checked:group-[]:block hidden text-orange-f6 fa-solid fa-square-check"></i>
                            </div>
                            직접 입력
                        </label>
                    </div>
                    <div v-if="states.checkedTime === 'select'" v-bind:class="`${states.checkedTimeState.type === 'error' ? 'animate-shake' : ''} w-full mt-2 relative flex items-center gap-2`">
                        <div class="w-[5.5rem] shrink-0">
                            <input v-on:change="handleStartTimeSelect" type="checkbox" id="start-time" class="hidden peer"/>
                            <label for="start-time" v-on:mousedown="handleStartTimeSelectMouseDown" class="start-time-select group relative w-full h-11 px-4 flex cursor-pointer rounded-lg border border-gray-6 placeholder-gray-9">
                                <div class="start-time-select relative w-full h-full flex items-center selection:bg-transparent">
                                    {{ states.startTimeSelect }}
                                    <i class="start-time-select peer-checked:group-[]:rotate-180 fa-solid fa-angle-down absolute right-0 top-1/2 -translate-y-1/2"></i>
                                </div>
                                <ul v-if="states.startTimeSelectShow" class="start-time-select w-[calc(100%+2px)] overflow-y-auto py-2 absolute z-10 -left-px top-12 text-left rounded-lg border border-gray-6 bg-white">
                                    <li v-on:click="handleStartTimeSelectClick" data-option="오전" class="start-time-select w-full px-4 py-1.5 lg:hover:bg-orange-fe selection:bg-transparent">오전</li>
                                    <li v-on:click="handleStartTimeSelectClick" data-option="오후" class="start-time-select w-full px-4 py-1.5 lg:hover:bg-orange-fe selection:bg-transparent">오후</li>
                                </ul>
                            </label>
                        </div>
                        <input type="number" placeholder="ex) 12" v-on:input="handleStartTimeNumChange" id="start-time-num" ref="start-time-num" v-bind:class="`${states.capacityState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 disabled:border-gray-c placeholder-gray-9`"/>
                        <div class="shrink-0">부터</div>
                    </div>
                    <div v-if="states.checkedTime === 'select'" v-bind:class="`${states.checkedTimeState.type === 'error' ? 'animate-shake' : ''} w-full mt-2 relative flex items-center gap-2`">
                        <div class="w-[5.5rem] shrink-0">
                            <input v-on:change="handleEndTimeSelect" type="checkbox" id="end-time" class="hidden peer"/>
                            <label for="end-time" v-on:mousedown="handleEndTimeSelectMouseDown" class="end-time-select group relative w-full h-11 px-4 flex cursor-pointer rounded-lg border border-gray-6 placeholder-gray-9">
                                <div class="end-time-select relative w-full h-full flex items-center selection:bg-transparent">
                                    {{ states.endTimeSelect }}
                                    <i class="end-time-select peer-checked:group-[]:rotate-180 fa-solid fa-angle-down absolute right-0 top-1/2 -translate-y-1/2"></i>
                                </div>
                                <ul v-if="states.endTimeSelectShow" class="end-time-select w-[calc(100%+2px)] overflow-y-auto py-2 absolute z-10 -left-px top-12 text-left rounded-lg border border-gray-6 bg-white">
                                    <li v-on:click="handleEndTimeSelectClick" data-option="오전" class="end-time-select w-full px-4 py-1.5 lg:hover:bg-orange-fe selection:bg-transparent">오전</li>
                                    <li v-on:click="handleEndTimeSelectClick" data-option="오후" class="end-time-select w-full px-4 py-1.5 lg:hover:bg-orange-fe selection:bg-transparent">오후</li>
                                </ul>
                            </label>
                        </div>
                        <input type="number" placeholder="ex) 6" v-on:input="handleEndTimeNumChange" id="end-time-num" ref="end-time-num" v-bind:class="`${states.capacityState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 disabled:border-gray-c placeholder-gray-9`"/>
                        <div class="shrink-0">까지</div>
                    </div>
                    <div v-if="states.checkedTimeState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                        {{ states.checkedTimeState.msg }}
                    </div>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward" :isLoading="states.isLoading">{{ states.allowCapacity ? '다음으로' : '약속 생성' }}</Button>
                    </div>
                </div>
            </SubPage>
        </div>
        <div
            v-if="states.query === '5'"
            class="w-full max-w-[22.5rem]"
        >
            <SubPage
                :handleClose="handleStepBack"
                title="알림 설정"
            >
                <div class="w-full text-center">
                    <h2 class="font-bold text-2xl leading-normal">
                        알림을 받으시겠어요?
                    </h2>
                    <h3 class="mt-4 mb-10 leading-normal">인원이 채워지면 알림을 보내요</h3>
                    <div class="w-full mt-2 flex items-center gap-2">
                        <input type="radio" name="email" id="disallow-email" v-on:change="handleEmail" v-bind:checked="!states.allowEmail" class="peer hidden"/>
                        <label for="disallow-email" class="group w-full h-11 px-4 gap-2 flex items-center cursor-pointer rounded-lg border border-gray-6 peer-checked:border-orange-f6 selection:bg-transparent">
                            <div class="text-lg">
                                <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                                <i class="peer-checked:group-[]:block hidden text-orange-f6 fa-solid fa-square-check"></i>
                            </div>
                            안 받을래요.
                        </label>
                    </div>
                    <div class="w-full mt-2 flex items-center gap-2">
                        <input type="radio" name="email" id="allow-email" v-on:change="handleEmail" v-bind:checked="states.allowEmail" class="peer hidden"/>
                        <label for="allow-email" class="group w-full h-11 px-4 gap-2 flex items-center cursor-pointer rounded-lg border border-gray-6 peer-checked:border-orange-f6 selection:bg-transparent">
                            <div class="text-lg">
                                <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                                <i class="peer-checked:group-[]:block hidden text-orange-f6 fa-solid fa-square-check"></i>
                            </div>
                            받을래요.
                        </label>
                    </div>
                    <div v-if="states.allowEmail" class="w-full mt-8">
                        <h3 class="mb-4 leading-normal">이메일을 적어주세요</h3>
                        <input type="text" placeholder="ex) example@example.com" v-bind:value="states.email" v-on:input="handleEmailChange" id="email" ref="email" v-bind:class="`${states.emailState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 placeholder-gray-9`"/>
                        <div v-if="states.emailState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                            {{ states.emailState.msg }}
                        </div>
                    </div>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward" :isLoading="states.isLoading">약속 생성</Button>
                    </div>
                </div>
            </SubPage>
        </div>
    </main>
</template>

<script setup lang="ts">
    definePageMeta({
        middleware: ["create"],
    });

    // Firestore
    import { collection, addDoc } from 'firebase/firestore';

    // Load firebase collection
    const { firestore } = useFirebase();
    const myCollection = collection(firestore, "posts");

    // Common
    import { handleTimeBlockArr } from '~/utils/common';

    // Query
    import type { LocationQuery, LocationQueryValue } from '#vue-router';

    // Types
    import type { Time, State } from '~/utils/global.d';

    // Vue date picker
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    // Route
    const route = useRoute();
    const router = useRouter();

    interface Table {
        date: string | Date,
        times: Time[]
    }

    interface States {
        query: LocationQueryValue | LocationQueryValue[],
        title: string,
        titleState: State,
        capacity: string,
        capacityState: State,
        allowCapacity: boolean,
        dates: Date[],
        datesState: State,
        startTime: number,
        endTime: number,
        checkedTime: string,
        checkedTimeState: State,
        startTimeSelect: string,
        startTimeSelectShow: boolean,
        endTimeSelect: string,
        endTimeSelectShow: boolean,
        allowEmail: boolean,
        email: string,
        emailState: State,
        isLoading: boolean,
    }

    // States
    const states: States = reactive({
        query: route.query.step,
        title: "",
        titleState: { type: "", msg: "" },
        capacity: "",
        capacityState: { type: "", msg: "" },
        allowCapacity: true,
        dates: [new Date()],
        datesState: { type: "", msg: "" },
        startTime: 9,
        endTime: 18,
        checkedTime: "default",
        checkedTimeState: { type: "", msg: "" },
        startTimeSelect: "오전",
        startTimeSelectShow: false,
        endTimeSelect: "오후",
        endTimeSelectShow: false,
        allowEmail: false,
        email: "",
        emailState: { type: "", msg: "" },
        isLoading: false,
    });

    // Refs
    const title = ref();
    const capacity = ref();
    const email = ref();
    const date = ref();

    // Watch queries
    watch(() => route.query, async () => {
        window.scrollTo({ top: 0 });
        handleQuery(route.query);
    });

    // Watch inputs
    watch(() => ([title.value, capacity.value, email.value]), async () => {
        if (title.value) title.value.focus();
        else if (capacity.value) capacity.value.focus();
        else if (email.value) email.value.focus();
    });

    // Watch dates
    const handleInternal = (date: Date[]) => {
        states.dates = date;
        states.datesState = { type: "", msg: "" };
    }

    const handleQuery = (query: LocationQuery) => {
        states.query = query.step;
    }

    const handleStepBack = () => {
        router.go(-1);
    }

    const handleStepForward = async () => {
        const width = window.innerWidth;

        if (!states.query) {
            if (states.title === "") {
                states.titleState = { type: "error", msg: "제목은 빈칸으로 남길 수 없어요." }
                
                // Trigger scroll event
                if (width >= 1024) {
                    title.value.focus({ preventScroll: true });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    title.value.focus();
                }
            } else {
                router.push("/create?step=2");
            }
        } else if (states.query === "2") {
            if (states.allowCapacity) {
                if (states.capacity === "") {
                    states.capacityState = { type: "error", msg: "인원수는 빈칸으로 남길 수 없어요." }
                    
                    // Trigger scroll event
                    if (width >= 1024) {
                        capacity.value.focus({ preventScroll: true });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                        capacity.value.focus();
                    }
                } else if (Number(states.capacity) <= 0) {
                    states.capacityState = { type: "error", msg: "인원수는 0명 이하로 설정할 수 없어요." }

                    // Trigger scroll event
                    if (width >= 1024) {
                        capacity.value.focus({ preventScroll: true });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                        capacity.value.focus();
                    }
                } else {
                    router.push("/create?step=3");
                }
            } else {
                router.push("/create?step=3");
            }
        } else if (states.query === "3") {
            if (states.dates === null || states.dates.length === 0) {
                states.datesState = { type: "error", msg: "날짜를 선택해 주세요." };
            } else {
                router.push("/create?step=4");
            }
        } else if (states.query === "4") {
            const startTimeNum = document.getElementById("start-time-num") as HTMLInputElement;
            const endTimeNum = document.getElementById("end-time-num") as HTMLInputElement;

            if (states.checkedTime === "select") {
                if (startTimeNum.value === "" || endTimeNum.value === "") {
                    states.checkedTimeState = { type: "error", msg: "시간대를 입력해 주세요." }
                } else if (states.startTime > 24 || states.startTime < 0 || states.endTime > 24 || states.endTime < 0 || states.endTime - states.startTime <= 0) {
                    states.checkedTimeState = { type: "error", msg: "시간대를 올바르게 입력해 주세요." }
                } else {
                    if (states.allowCapacity) {
                        router.push("/create?step=5");
                    } else {
                        // Init creation
                        await handleCreate();
                    }
                }
            } else {
                if (states.allowCapacity) {
                    router.push("/create?step=5");
                } else {
                    // Init creation
                    await handleCreate();
                }
            }
        } else if (states.query === "5") {
            if (states.allowEmail) {
                if (states.email === "") {
                    states.emailState = { type: "error", msg: "이메일은 빈칸으로 남길 수 없어요." }
                    
                    // Trigger scroll event
                    if (width >= 1024) {
                        email.value.focus({ preventScroll: true });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                        email.value.focus();
                    }
                } else {
                    // Init creation
                    await handleCreate();
                }
            } else {
                // Init creation
                await handleCreate();
            }
        }
    }

    /** Trigger title change event */
    const handleTitleChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.title = el.value;
        states.titleState = { type: "", msg: "" };
    }

    /** Trigger capacity change event */
    const handleCapacityChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.capacity = el.value;
        states.capacityState = { type: "", msg: "" };
    }

    /** Trigger capacity check event */
    const handleCapacityCheck = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.allowCapacity = !el.checked;
        states.capacityState.type = "";
    }

    /** Trigger time check event */
    const handleTime = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.checkedTime = el.value;
        states.checkedTimeState = { type: "", msg: "" };

        if (states.checkedTime === "morning") {
            states.startTime = 8;
            states.endTime = 12;
        } else if (states.checkedTime === "afternoon") {
            states.startTime = 12;
            states.endTime = 18;
        } else if (states.checkedTime === "night") {
            states.startTime = 18;
            states.endTime = 24;
        }
    }

    const handleStartTimeSelect = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.startTimeSelectShow = el.checked;
    }

    const handleStartTimeSelectClick = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.startTimeSelect = el.getAttribute("data-option") + "";
    }

    const handleStartTimeSelectMouseDown = (e: MouseEvent) => {
        const el = e.target as HTMLElement;
        const select = document.getElementById("start-time") as HTMLInputElement;
        if (!el.classList.contains("start-time-select")) {
            if (select) {
                select.checked = false;
                states.startTimeSelectShow = false;
            }
        }
    }

    const handleStartTimeNumChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.checkedTimeState = { type: "", msg: "" };
        if (states.startTimeSelect === "오전") {
            states.startTime = Number(el.value);
        } else {
            if (Number(el.value) === 12) states.startTime = Number(el.value);
            else if (Number(el.value)) states.startTime = Number(el.value) + 12;
        }
    }

    const handleEndTimeSelect = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.endTimeSelectShow = el.checked;
    }

    const handleEndTimeSelectClick = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.endTimeSelect = el.getAttribute("data-option") + "";
    }

    const handleEndTimeSelectMouseDown = (e: MouseEvent) => {
        const el = e.target as HTMLElement;
        const select = document.getElementById("end-time") as HTMLInputElement;
        if (!el.classList.contains("end-time-select")) {
            if (select) {
                select.checked = false;
                states.endTimeSelectShow = false;
            }
        }
    }

    const handleEndTimeNumChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.checkedTimeState = { type: "", msg: "" };
        if (states.endTimeSelect === "오전") {
            states.endTime = Number(el.value);
        } else {
            states.endTime = Number(el.value) + 12;
        }
    }

    /** Trigger email check event */
    const handleEmail = (e: Event) => {
        const el = e.target as HTMLInputElement;

        if (el.id === "allow-email") {
            states.allowEmail = true;
        } else {
            states.allowEmail = false;
        }

        states.email = "";
        states.emailState = { type: "", msg: "" };
    }

    /** Trigger email change event */
    const handleEmailChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.email = el.value;
        states.emailState = { type: "", msg: "" };
    }

    const onGlobalStepForward = async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            await handleStepForward();
        }
    }

    /** Trigger create event */
    const handleCreate = async () => {
        states.isLoading = true;

        // 날짜순 정렬
        const sortedDates = states.dates.sort((a, b) => a.getTime() - b.getTime());

        // 날짜 문자열로 변경
        const newDates: string[] = [];
        for (let i = 0; i < sortedDates.length; i++) {
            newDates.push(sortedDates[i].toString());
        }
        
        // 테이블 생성
        const thisTable = [];
        const thisTime = handleTimeBlockArr(states.startTime, states.endTime);
        for (let i = 0; i < newDates.length; i++) {
            let obj: Table = { date: newDates[i], times: [] };
            for (let j = 0; j < thisTime.length; j++) {
                obj.times.push({
                    time: thisTime[j],
                    selected: []
                });
            }
            thisTable.push(obj);
        }

        // 데이터 생성
        const data = {
            title: states.title === "" ? "제목없음" : states.title,
            dates: newDates,
            start_time: states.startTime,
            end_time: states.endTime,
            email: states.email,
            email_sent: false,
            allow_email: states.email === "" ? false : states.allowEmail,
            partywons: [],
            tables: thisTable,
            capacity: Number(states.capacity),
            allow_capacity: states.capacity === "" ? false : states.allowCapacity
        }

        try {
            const docRef = await addDoc(myCollection, data);
            router.push(`/p/${docRef.id}`);
        } catch (err) {
            console.log(err);
            states.isLoading = false;
        }
    }

    onMounted(() => {
        window.addEventListener("keydown", onGlobalStepForward);
        window.addEventListener("mousedown", handleStartTimeSelectMouseDown);
        window.addEventListener("mousedown", handleEndTimeSelectMouseDown);

        date.value = states.dates;

        // Focus input on component mount
        if (!states.query) {
            const title = document.getElementById("title") as HTMLInputElement;
            title.focus();
        } else {
            if (states.query === "2") {
                const capacity = document.getElementById("capacity") as HTMLInputElement;
                capacity.focus();
            }
        }
    });

    onBeforeUnmount(() => {
        window.removeEventListener("keydown", onGlobalStepForward);
        window.removeEventListener("mousedown", handleStartTimeSelectMouseDown);
        window.removeEventListener("mousedown", handleEndTimeSelectMouseDown);
    });
</script>

<style>
    :root {
        --dp-font-family: "Pretendard", sans-serif;
        --dp-menu-min-width: 22.5rem;
        --dp-button-icon-width: 1.125rem;
        --dp-button-icon-height: 1.125rem;
        --dp-border-radius: 0.5rem;
    }
    .dp__theme_light {
        --dp-text-color: #333;
        --dp-primary-color: #FF6E40;
        --dp-secondary-color: #CCC;
        --dp-hover-color: #E9EAEE;
        --dp-icon-color: #333;
        --dp-hover-icon-color: #333;
        --dp-border-color: #999;
        --dp-menu-border-color: #666;
    }
    .dp--tp-wrap,
    .dp__action_row {
        display: none;
    }
    .dp__menu {
        overflow: hidden;
    }
    .dp__calendar {
        margin-top: 0.5rem;
    }
    .dp__calendar_header_item {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dp__calendar_item {
        width: 3rem;
        height: 2.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .dp__cell_inner {
        width: 2rem;
        height: 2rem;
        border-radius: 9999px;
    }
</style>
