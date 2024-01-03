<template>
    <div class="w-full h-full fixed left-0 top-0 flex justify-center items-center bg-black-333/20">
        <div class="w-[1024px] p-14 rounded-lg bg-white">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({

    });
</script>

<style>

</style>