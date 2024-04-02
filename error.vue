<template>
    <NuxtLayout :name="'error'">
        <main class="w-full h-full absolute flex flex-col gap-2 justify-center items-center font-sans">
            <div class="flex flex-col items-center text-center leading-normal text-black-3">
                <div class="font-bold text-5xl">{{ error.statusCode }}</div>
                <div class="mt-4 mb-10">{{ error.statusMessage }}</div>
                <div class="w-32">
                    <Button @click="handleError">홈으로 가기</Button>
                </div>
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
    const props = defineProps({
        error: Object
    });

    const defaultError = {
        statusCode: '404',
        statusMessage: 'Page not found'
    }
    const error = props.error ? props.error : defaultError;

    const handleError = () => clearError({ redirect: '/' });
</script>
