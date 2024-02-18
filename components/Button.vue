<template>
    <button
        @click="handleClick()"
        @mousedown="handleMousedown"
        @mouseup="handleMouseup"
        @mouseleave="handleMouseup"
        class="px-4 py-2.5 shrink-0 rounded border-2 duration-100 border-blue-4 text-blue-4 lg:hover:bg-blue-4 lg:hover:text-white"
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

    // 마우스 이벤트
    const handleMousedown = (e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement;
        button.classList.remove("lg:hover:bg-blue-4");
        button.classList.add("lg:hover:bg-blue-4-h", "lg:border-blue-4-h");
    }
    const handleMouseup = (e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement;
        button.classList.remove("lg:hover:bg-blue-4-h", "lg:border-blue-4-h");
        button.classList.add("lg:hover:bg-blue-4");
    }
</script>

<style></style>
