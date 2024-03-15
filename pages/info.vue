<template>
    <main class="font-sans w-full flex justify-center px-5 lg:px-16 pt-20 lg:pt-40 pb-40 text-black-3">
        <div class="w-[48rem] text-center">
            <h2 class="text-3xl font-bold leading-normal">
                약속 시간을 정하는<br/>
                가장 쉬운 방법
            </h2>
            <h3 class="mt-5">
                약속 일정을 만들고 만날 시간을 정해요.
            </h3>
            <div class="w-full flex justify-center mt-12">
                <div class="w-72 h-12">
                    <Button onClick="onClick" fill>약속 만들기</Button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    // Components
    import Button from '~/components/Button.vue';
</script>
