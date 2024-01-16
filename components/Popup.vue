<template>
    <div v-show="show" class="w-full h-full fixed left-0 top-0 flex justify-center items-center text-black-333 bg-black-333/20">
        <div class="w-[768px] p-14 relative rounded-lg bg-white">
            <button @click="handleClick()" class="absolute right-5 top-5">
                <i class="text-2xl leading-none fa-solid fa-xmark"></i>
            </button>
            <h2 class="mb-3 text-xl">{{ title }}</h2>
            <h3 class="mb-10 text-sm font-light">{{ subtitle }}</h3>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        show: Boolean,
        handleShow: Function,
        title: String,
        subtitle: String,
    });

    const handleClick = props.handleShow ? props.handleShow : () => { return }
</script>

<style>

</style>