<template>
    <button
        @click="handleClick()"
        @mousedown="e => handleMousedown(e, color)"
        @mouseup="e => handleMouseup(e, color)"
        @mouseleave="e => handleMouseup(e, color)"
        v-bind:class="`px-4 py-1.5 flex items-center gap-3 shrink-0 rounded border-2 outline-none duration-100 
                        ${
                            color === 'blue' 
                            ? 'border-blue-1 text-blue-1 lg:hover:bg-blue-1 lg:hover:text-white' 
                            : 'border-gray-4 text-gray-4 lg:hover:bg-gray-4 lg:hover:text-white'
                        }
                    `"
    > 
        <i
            v-if="icon !== ''"
            v-bind:class="`${icon}`"
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
        color: {
            type: String,
            required: false,
            default: "blue"
        },
        text: String,
        click: Function,
    });

    const handleClick = props.click ? props.click : () => { return }

    // 마우스 이벤트
    const handleMousedown = (e: MouseEvent, color: string) => {
        const button = e.currentTarget as HTMLButtonElement;
        if (color === "blue") {
            button.classList.remove("lg:hover:bg-blue-1");
            button.classList.add("lg:hover:bg-blue-0", "lg:border-blue-0");
        } else {
            button.classList.remove("lg:hover:bg-gray-4");
            button.classList.add("lg:hover:bg-gray-6", "lg:border-gray-6");
        }
    }
    const handleMouseup = (e: MouseEvent, color: string) => {
        const button = e.currentTarget as HTMLButtonElement;
        if (color === "blue") {
            button.classList.remove("lg:hover:bg-blue-0", "lg:border-blue-0");
            button.classList.add("lg:hover:bg-blue-1");
        } else {
            button.classList.remove("lg:hover:bg-gray-6", "lg:border-gray-6");
            button.classList.add("lg:hover:bg-gray-4");
        }
    }
</script>

<style></style>
