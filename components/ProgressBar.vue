<template>
    <div class="w-full h-0.5 fixed z-50 left-0 top-[calc(4rem-2px)]">
        <div v-bind:style="`width: ${(props.step / props.total) * 100}%`" class="h-full bg-orange-f6 duration-200"></div>
    </div>
</template>

<script setup>
    const props = defineProps({
        step: Number,
        total: Number
    });
</script>
