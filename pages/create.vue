<template>
    <main class="w-full flex justify-center px-5 lg:px-0 py-24 text-black-3">
        <ProgressBar
            :step="!states.query ? 0 : Number(states.query) - 1"
            :total="4"
        />
        <div
            v-if="!states.query && states.query !== '2' && states.query !== '3'"
            class="w-full max-w-[22.5rem]"
        >
            <SubPage
                :handleClose="handleStepBack"
                title="약속 잡기"
            >
                <div class="w-full text-center">
                    <h2 class="font-bold text-2xl leading-normal">
                        어떤 약속인가요?
                    </h2>
                    <h3 class="mt-4 mb-12">20자 이내로 적어주세요</h3>
                    <input type="text" placeholder="ex) 6월 첫째주 주말 스터디" v-bind:value="states.title" v-on:input="handleTitleChange" v-on:value="states.title" id="title" ref="title" maxlength="20" v-bind:class="`${states.titleState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 placeholder-gray-9`"/>
                    <div v-if="states.titleState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                        {{ states.titleState.msg }}
                    </div>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward" fill>다음으로</Button>
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
                title="약속 잡기"
            >
                <div class="w-full text-center">
                    <h2 class="font-bold text-2xl leading-normal">
                        몇 명이 참석하나요?
                    </h2>
                    <h3 class="mt-4 mb-12">참석할 인원을 숫자로 적어주세요</h3>
                    <input type="number" placeholder="ex) 4" v-bind:value="states.capacity" v-on:input="handleCapacityChange" id="capacity" ref="capacity" maxlength="4" v-bind:class="`${states.capacityState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 placeholder-gray-9`"/>
                    <div v-if="states.capacityState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                        {{ states.capacityState.msg }}
                    </div>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward" fill>다음으로</Button>
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
                title="약속 잡기"
            >
                <div class="w-full text-center">
                    <h2 class="font-bold text-2xl leading-normal">
                        캘린더
                    </h2>
                    <h3 class="mt-4 mb-12">약속할 날짜</h3>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepForward" fill>다음으로</Button>
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
    });

    // Refs
    const title = ref();
    const capacity = ref();

    // Watch queries
    watch(() => route.query, async () => {
        handleQuery(route.query);
    });

    // Watch inputs
    watch(() => ([title.value, capacity.value]), async () => {
        if (title.value) title.value.focus();
        else if (capacity.value) capacity.value.focus();
    });

    const handleQuery = (query: LocationQuery) => {
        states.query = query.step;
    }

    const handleStepBack = () => {
        router.go(-1);
    }

    const handleStepForward = () => {
        if (!states.query) {
            if (states.title === "") {
                states.titleState = { type: "error", msg: "제목은 빈칸으로 남길 수 없어요." }
                title.value.focus({ preventScroll: true });
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                router.push("/create?step=2");
            }
        } else if (states.query === "2") {
            if (states.capacity === "") {
                states.capacityState = { type: "error", msg: "인원수는 빈칸으로 남길 수 없어요." }
                capacity.value.focus({ preventScroll: true });
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                router.push("/create?step=3");
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
