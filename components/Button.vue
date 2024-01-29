<template>
    <button
        @click="handleClick()"
        @mousedown="handleMousedown"
        @mouseup="handleMouseup"
        class="px-4 py-2.5 shrink-0 rounded border-2 duration-100 border-blue-4 focus:border-blue-4 text-blue-4 hover:bg-blue-4 hover:text-white"
    > 
        <i
            v-if="icon !== ''"
            v-bind:class="`mr-2 ${icon}`"
        ></i>
        <slot>{{ text }}</slot>
    </button>
</template>

<script setup lang="ts">
    const props = defineProps({
        icon: {
            type: String,
            required: false,
            default: ""
        },
        text: String,
        click: Function,
    });

    const handleClick = props.click ? props.click : () => { return }
    const handleMousedown = (e: MouseEvent) => {
        const button = e.target as HTMLButtonElement;
        button.classList.remove("bg-blue-4");
        button.classList.add("bg-blue-3");
    }
    const handleMouseup = (e: MouseEvent) => {
        const button = e.target as HTMLButtonElement;
        button.classList.remove("bg-blue-3");
    }
</script>

<style></style>
