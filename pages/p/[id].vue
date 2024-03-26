<template>
    <main v-if="!states.query || states.query !== '1'" class="w-full px-5 lg:px-0 pt-12 lg:pt-24 pb-24 flex justify-center text-black-3">
        <div class="max-w-[48rem] w-full">
            <div>
                <div>
                    <h2 class="text-2xl font-bold">{{ data.title }}</h2>
                </div>
                <div class="shrink-0 mt-4 flex gap-4">
                    <button v-on:click="handleReset" class="w-fit flex items-center gap-2 mb-1 lg:hover:text-orange-f6 duration-200">
                        <i class="bi bi-plus-circle text-sm"></i>
                        리셋하기
                    </button>
                    <button v-on:click="handleSubPageShow" class="w-fit flex items-center gap-2 mb-1 lg:hover:text-orange-f6 duration-200">
                        <i class="bi bi-plus-circle text-sm"></i>
                        시간 선택하기
                    </button>
                    <button v-on:click="copyLink" v-bind:class="`${states.copyLink ? 'text-orange-f6' : 'text-black-3'} w-fit flex items-center gap-2 mb-1 lg:hover:text-orange-f6 duration-200`">
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
                                    : 'border-orange-f6 text-orange-f6'
                                } px-3 py-1 border rounded-lg duration-200`"
                            >
                                {{ partywon.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-full mt-6">
                    <TimelineView
                        :capacity="capacity"
                        :times="times"
                        :tables="newTables"
                        :onCheck="handleTimeCheck"
                        :onUncheck="handleTimeUncheck"
                    />
                </div>
            </div>
        </div>
        <Toast/>
    </main>
    <main v-else-if="states.query === '1'" class="w-full px-5 lg:px-0 py-24 text-black-3">
        <SubPage
            :handleClose="handleSubPageClose"
            title="약속 시간 선택"
        >
            <div class="w-full max-w-[48rem] text-center flex flex-col items-center">
                <div class="w-full max-w-[22.5rem] shrink-0">
                    <h2 class="font-bold text-2xl leading-normal">
                        파티원님을 어떻게<br/>
                        부르면 되나요?
                    </h2>
                    <h3 class="mt-4 mb-10 leading-normal">이름은 20자 이내로 적어주세요</h3>
                    <input type="text" placeholder="ex) 박티원" v-on:input="handleSubPageNameChange" id="name" ref="name" maxlength="20" v-bind:class="`${states.subPageNameState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 placeholder-gray-9`"/>
                    <div v-if="states.subPageNameState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                        {{ states.subPageNameState.msg }}
                    </div>
                </div>
                <h2 class="mt-24 font-bold text-2xl leading-normal">언제 약속을 잡을까요?</h2>
                <h3 class="mt-4 mb-10 leading-normal">시간은 드래그해서 선택할 수 있어요</h3>
                <div class="w-full">
                    <TimelineSelect
                        :times="times"
                        :dates="dates"
                        :tables="newTables"
                        :onChange="handleSubPageTimeChange"
                        :state="states.subPageTimeState"
                        :onStateChange="handleSubPageTimeStateChange"
                    />
                </div>
                <div class="w-full h-12 mt-6">
                    <Button :click="handleSubPageCreate" :icon="'bi bi-check-circle'" fill>선택하기</Button>
                </div>
            </div>
        </SubPage>
    </main>
</template>

<script setup lang="ts">
    // Pinia
    import { useToastStore } from '~/stores/toast';
    const toastStore = useToastStore();

    // Firestore
    import { collection, setDoc, doc, onSnapshot } from 'firebase/firestore';
    import type { LocationQuery, LocationQueryValue } from '#vue-router';

    // Load firebase collection
    const { firestore } = useFirebase();
    const myCollection = collection(firestore, "posts");

    // Types
    interface States {
        query: LocationQueryValue | LocationQueryValue[],
        selectedPartywons: string[],
        subPageName: string,
        subPageNameState: SubPageNameState,
        subPageTime: number[][],
        subPageTimeState: SubPageTimeState,
        copyLink: boolean
    }

    interface Partywons {
        name: string
    }

    interface Table {
        date: string | Date,
        times: Time[]
    }

    interface Time {
        time: number,
        selected: string[]
    }

    interface SubPageNameState {
        type: string,
        msg: string
    }

    interface SubPageTimeState {
        type: string,
        msg: string
    }

    // Route
    const route = useRoute();
    const router = useRouter();

    // States
    const states: States = reactive({
        query: route.query.create,
        selectedPartywons: [],
        subPageName: "",
        subPageNameState: { type: "", msg: "" },
        subPageTime: [],
        subPageTimeState: { type: "", msg: "" },
        copyLink: false,
    });

    // Refs
    const name = ref();

    // Watch queries
    watch(() => route.query, async () => {
        handleQuery(route.query);
    });

    // Watch inputs
    watch(() => name.value, async () => {
        if (name.value) name.value.focus();
    });
    
    const handleQuery = (query: LocationQuery) => {
        states.query = query.create;
        states.subPageName = "";
        states.subPageNameState = { type: "", msg: "" };
        states.subPageTime = [];
        states.subPageTimeState = { type: "", msg: "" };
    }

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

    /** 테이블 나누기 */
    const divideTables = (table: Table[], number: number) => {
        const length = table.length;
        const divide = Math.floor(length / number) + (Math.floor( length % number ) > 0 ? 1 : 0);
        const arr = [];
        for (let i = 0; i < divide; i++) {
            arr.push(table.splice(0, number)); 
        }
        return arr;
    }

    /** 테이블 문자열을 날짜 객체로 변경 */
    const tablesWithDate: Table[] = [];
    tables.map((table: Table) => {
        tablesWithDate.push({ date: new Date(table.date), times: table.times });
    });
    const newTables = divideTables(tablesWithDate, 7);

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

    /** Trigger time mouseover event */
    const handleTimeCheck = (time: Time) => {
        states.selectedPartywons = time.selected;
    }

    /** Trigger time mouseleave event */
    const handleTimeUncheck = () => {
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

    /** Show/close subpage */
    const handleSubPageShow = () => {
        router.push(`/p/${routeId}?create=1`);
    }

    const handleSubPageClose = () => {
        router.push(`/p/${routeId}`);
    }

    /** Trigger subpage name change event */
    const handleSubPageNameChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.subPageName = el.value;
        states.subPageNameState = { type: "", msg: "" };
    }

    /** Trigger subpage time change event */
    const handleSubPageTimeChange = (arr: number[][]) => {
        states.subPageTime = arr;
        states.subPageTimeState = { type: "", msg: "" };
    }

    /** Trigger subpage time state change event */
    const handleSubPageTimeStateChange = () => {
        states.subPageTimeState = { type: "", msg: "" };
    }

    /** Trigger subpage create event */
    const handleSubPageCreate = async () => {
        const width = window.innerWidth;
        const name = document.getElementById("name") as HTMLInputElement;

        if (states.subPageName === "") {
            states.subPageNameState = {
                type: "error",
                msg: "이름은 빈칸으로 남길 수 없어요.",
            };

            // Trigger scroll event
            if (width >= 1024) {
                name.focus({ preventScroll: true });
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                name.focus();
            }
        } else if (partywons.some((obj: Partywons) => obj.name === states.subPageName)) {
            states.subPageNameState = {
                type: "error",
                msg: "중복된 이름은 사용할 수 없어요."
            };

            // Trigger scroll event
            if (width >= 1024) {
                name.focus({ preventScroll: true });
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                name.focus();
            }
        } else if (states.subPageTime.length === 0) {
            states.subPageTimeState = {
                type: "error",
                msg: "가능한 시간대를 선택해 주세요."
            };
        } else {
            try {
                // Set new partywon
                const thisPartywon = partywons;
                thisPartywon.push({ name: states.subPageName });

                // Set new time
                const thisTables = tables;
                for (let i = 0; i < thisTables.length; i++) {
                    for (let j = 0; j < thisTables[i].times.length; j++) {
                        if (states.subPageTime[i].includes(thisTables[i].times[j].time)) {
                            thisTables[i].times[j].selected.push(states.subPageName);
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

                // Close subpage
                handleSubPageClose();
            } catch (err) {
                console.log(err);
            }
        }
    }

    const onGlobalSubPageCreate = (e: KeyboardEvent) => {
        if (e.key === "Enter") handleSubPageCreate();
    }

    onMounted(async () => {
        // 데이터 업데이트
        const docRef = doc(firestore, "posts", routeId);
        onSnapshot(docRef, (snap) => {
            data.value = snap.data();
        });

        window.addEventListener("keydown", onGlobalSubPageCreate);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("keydown", onGlobalSubPageCreate);
    });

    const handleReset = async () => {
        try {
            await setDoc(doc(myCollection, routeId), {
                title: "12/26 풋살하실 분",
                dates: [
                    'Tue Dec 26 2023',
                    'Wed Dec 27 2023',
                    'Thu Dec 28 2023',
                    'Fri Dec 29 2023',
                    'Sat Dec 30 2023',
                    'Sun Dec 31 2023',
                    'Mon Jan 01 2024',
                    'Tue Jan 02 2024',
                    'Wed Jan 03 2024',
                    'Thu Jan 04 2024',
                ],
                start_time: 10,
                end_time: 15,
                email: "partywonguham@gmail.com",
                allow_email: false,
                partywons: [],
                tables: [
                    {
                        date: "Tue Dec 26 2023",
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
                        date: "Wed Dec 27 2023",
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
                        date: "Thu Dec 28 2023",
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
                        date: "Fri Dec 29 2023",
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
                        date: "Sat Dec 30 2023",
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
                        date: "Sun Dec 31 2023",
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
                        date: "Mon Jan 1 2024",
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
                        date: "Tue Jan 2 2024",
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
                        date: "Wed Jan 3 2024",
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
                        date: "Thu Jan 4 2024",
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