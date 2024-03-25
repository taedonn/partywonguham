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
                        캘린더
                    </h2>
                    <h3 class="mt-4 mb-10 leading-normal">약속 날짜</h3>
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
                        시간 선택
                    </h2>
                    <h3 class="mt-4 mb-10 leading-normal">약속 시간</h3>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward">{{ states.allowCapacity ? '다음으로' : '약속 생성' }}</Button>
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
                    <div v-if="states.allowEmail" class="w-full mt-2">
                        <h3 class="mt-10 mb-4 leading-normal">이메일을 적어주세요</h3>
                        <input type="text" placeholder="ex) example@example.com" v-bind:value="states.email" v-on:input="handleEmailChange" id="email" ref="email" v-bind:class="`${states.emailState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 placeholder-gray-9`"/>
                        <div v-if="states.emailState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                            {{ states.emailState.msg }}
                        </div>
                    </div>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward">약속 생성</Button>
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

    // Query
    import type { LocationQuery, LocationQueryValue } from '#vue-router';

    // Types
    interface States {
        query: LocationQueryValue | LocationQueryValue[],
        title: string,
        titleState: inputState,
        capacity: string,
        capacityState: inputState,
        allowCapacity: boolean,
        allowEmail: boolean,
        email: string,
        emailState: inputState,
    }

    interface inputState {
        type: string,
        msg: string,
    }

    // Route
    const route = useRoute();
    const router = useRouter();

    // States
    const states: States = reactive({
        query: route.query.step,
        title: "",
        titleState: { type: "", msg: "" },
        capacity: "",
        capacityState: { type: "", msg: "" },
        allowCapacity: true,
        allowEmail: false,
        email: "",
        emailState: { type: "", msg: "" },
    });

    // Refs
    const title = ref();
    const capacity = ref();
    const email = ref();

    // Watch queries
    watch(() => route.query, async () => {
        handleQuery(route.query);
    });

    // Watch inputs
    watch(() => ([title.value, capacity.value, email.value]), async () => {
        if (title.value) title.value.focus();
        else if (capacity.value) capacity.value.focus();
        else if (email.value) email.value.focus();
    });

    const handleQuery = (query: LocationQuery) => {
        states.query = query.step;
    }

    const handleStepBack = () => {
        router.go(-1);
    }

    const handleStepForward = () => {
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
                } else {
                    router.push("/create?step=3");
                }
            } else {
                router.push("/create?step=3");
            }
        } else if (states.query === "3") {
            router.push("/create?step=4");
        } else if (states.query === "4") {
            if (states.allowCapacity) {
                router.push("/create?step=5");
            } else {
                // Init creation
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
                }
            } else {
                // Init creation
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

    const onGlobalStepForward = (e: KeyboardEvent) => {
        if (e.key === "Enter") handleStepForward();
    }

    onMounted(() => {
        window.addEventListener("keydown", onGlobalStepForward);

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
    });
</script>
