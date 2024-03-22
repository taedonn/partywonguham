<template>
    <main class="w-full flex justify-center px-5 lg:px-0 py-24 text-black-3">
        <div v-if="!states.query" class="w-full max-w-[22.5rem]">
            <SubPage
                :handleClose="handleStep"
                title="약속 잡기"
                :step="0"
                :stepTotal="3"
            >
                <div class="w-full text-center">
                    <h2 class="font-bold text-2xl leading-normal">
                        어떤 약속인가요?
                    </h2>
                    <h3 class="mt-4 mb-12">20자 이내로 적어주세요</h3>
                    <input type="text" placeholder="ex) 6월 첫째주 주말 스터디" v-on:input="handleTitleChange" v-on:value="states.title" id="title" maxlength="20" v-bind:class="`${states.titleState.type === 'error' ? 'animate-shake' : ''} w-full px-4 py-2.5 border rounded-lg border-gray-6 placeholder-gray-9`"/>
                    <div v-if="states.titleState.type === 'error'" class="mt-2 text-xs text-left text-red-e">
                        {{ states.titleState.msg }}
                    </div>
                    <div class="w-full h-12 mt-4">
                        <Button :click="handleStepOne" fill>다음으로</Button>
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
        titleState: TitleState
    }

    interface TitleState {
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
        titleState: { type: "", msg: "" }
    });

    // Watch queries
    watch(() => route.query, async () => {
        handleQuery(route.query);
    });

    const handleQuery = (query: LocationQuery) => {
        states.query = query.step;
    }

    const handleStep = () => {
        if (states.query === "2") {
            router.push("/create");
        } else if (states.query === "3") {
            router.push("/create?step=2");
        } else {
            router.go(-1);
        }
    }

    const handleStepOne = () => {
        if (states.title === "") {
            states.titleState = { type: "error", msg: "제목은 빈칸으로 남길 수 없어요." };
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            router.push("/create?step=2");
        }
    }

    /** Trigger title change event */
    const handleTitleChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.title = el.value;
        states.titleState = { type: "", msg: "" };
    }
</script>
