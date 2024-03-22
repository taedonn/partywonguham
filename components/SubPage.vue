<template>
    <div class="w-full text-black-3">
        <div class="w-full">
            <div class="w-full h-16 fixed left-0 top-0 z-50 flex justify-center items-center border-b-2 border-gray-e bg-white">
                {{ title }}
                <button
                    @click="handleClick()"
                    @mousedown="handleCloseMousedown"
                    @mouseup="handleCloseMouseup"
                    @mouseleave="handleCloseMouseup"
                    class="w-10 h-10 absolute left-5 top-1/2 -translate-y-1/2 flex justify-start lg:justify-center items-center rounded-full duration-200 lg:hover:bg-gray-e"
                >
                    <i class="text-xl mr-0.5 fa-solid fa-angle-left"></i>
                </button>
                <div v-if="step !== null" v-bind:style="`width: ${ (step / stepTotal) * 100 }%`" class="absolute z-10 left-0 -bottom-0.5 h-0.5 bg-orange-f6 duration-200"></div>
            </div>
            <div class="w-full flex justify-center">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        handleClose: Function,
        title: {
            type: String,
            required: false,
            default: "",
        },
        step: {
            type: Number,
            required: false,
            default: null,
        },
        stepTotal: {
            type: Number,
            required: false,
            default: 1
        }
    });

    const handleClick = props.handleClose ? props.handleClose : () => { return }

    // 닫기 버튼 이벤트
    const handleCloseMousedown = (e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement;
        button.classList.remove("lg:hover:bg-gray-e");
        button.classList.add("lg:hover:bg-gray-d");
    }
    const handleCloseMouseup = (e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement;
        button.classList.remove("lg:hover:bg-gray-d");
        button.classList.add("lg:hover:bg-gray-e");
    }
</script>