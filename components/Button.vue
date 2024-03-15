<template>
    <button
        @click="handleClick()"
        @mousedown="e => handleMousedown(e, color)"
        @mouseup="e => handleMouseup(e, color)"
        @mouseleave="e => handleMouseup(e, color)"
        v-bind:class="`w-full h-full p-2 flex justify-center items-center gap-3 shrink-0 rounded-lg border-2 outline-none duration-200 
                        ${
                            color === 'blue' 
                            ? `${fill ? 'bg-blue-5 text-white': 'text-blue-5 lg:hover:bg-blue-5 lg:hover:text-white'} border-blue-5`
                            : `${fill ? 'bg-blue-7 text-white' : 'text-blue-7 lg:hover:bg-blue-7 lg:hover:text-white'} border-blue-7`
                        }
                    `"
    > 
        <i
            v-if="icon !== ''"
            v-bind:class="`${icon}`"
        ></i>
        <slot v-if="!isLoading">{{ text }}</slot>
        <div v-if="isLoading" class="loader w-5 h-5 border-2 border-white"></div>
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
        fill: {
            type: Boolean,
            required: false,
            default: false,
        },
        isLoading: {
            type: Boolean,
            required: false,
            default: false,
        },
        text: String,
        click: Function,
    });

    const handleClick = props.click ? props.click : () => { return }

    // 마우스 이벤트
    const handleMousedown = (e: MouseEvent, color: string) => {
        const button = e.currentTarget as HTMLButtonElement;
        if (color === "blue") {
            button.classList.remove("lg:hover:bg-blue-5");
            button.classList.add("lg:hover:bg-blue-1", "lg:border-blue-1");
        } else {
            button.classList.remove("lg:hover:bg-blue-7");
            button.classList.add("lg:hover:bg-blue-a", "lg:border-blue-a");
        }
    }
    const handleMouseup = (e: MouseEvent, color: string) => {
        const button = e.currentTarget as HTMLButtonElement;
        if (color === "blue") {
            button.classList.remove("lg:hover:bg-blue-1", "lg:border-blue-1");
            button.classList.add("lg:hover:bg-blue-5");
        } else {
            button.classList.remove("lg:hover:bg-blue-a", "lg:border-blue-a");
            button.classList.add("lg:hover:bg-blue-7");
        }
    }
</script>

<style>
    .loader {
        border-style: solid;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
    @keyframes rotation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    } 
</style>
