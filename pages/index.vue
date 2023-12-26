<template>
    <main class="w-full pt-40 flex justify-center">
        <div class="max-w-[1440px] w-full">
            <div class="w-full flex items-end text-black-333">
                <div class="w-full">
                    <h1 class="mb-3 text-xl leading-none font-medium">타임라인</h1>
                    <p class="text-base leading-6 font-light">
                        타임라인은 파티장이 설정한 시간표입니다. <br/>
                        시간 선택하기를 눌러 타임라인 내 가능한 시간을 선택해 주세요.
                    </p>
                </div>
                <button class="shrink-0 px-5 py-3 text-xl leading-none font-medium rounded-lg border-2 border-blue-4 text-blue-4">시간 선택하기</button>
            </div>
            <div class="mt-16 text-black-333">
                <div class="ml-1.5 pl-40">
                    <h2 class="mb-3 text-xl leading-none font-medium">{{ data.title }}</h2>
                    <p class="text-base leading-6 font-light">{{ data.date }}</p>
                </div>
                <div class="w-full mt-5 flex">

                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            data: {},
        }
    },
    methods: {
        async fetchData() {
            const data = {
                title: '11/23 풋살하실 분',
                date: '2023년 11/23일',
            }

            this.data = data;
        }
    },
    created() {
        this.fetchData();
    }
}
</script>

<style>

</style>