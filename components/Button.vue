<template>
    <button
        @click="handleClick()"
        class="px-4 py-2.5 shrink-0 rounded border-2 duration-100 border-blue-4 text-blue-4 hover:bg-blue-4 hover:text-white"
    > 
        <slot>{{ text }}</slot>
    </button>
</template>

<script setup lang="ts">
    const props = defineProps({
        text: String,
        click: Function,
    });

    const handleClick = props.click ? props.click : () => { return }
</script>

<style></style>
