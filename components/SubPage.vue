<template>
    <div class="w-full text-black-3">
        <div class="w-full">
            <div class="w-full h-16 fixed left-0 top-0 z-40 flex justify-center items-center border-b-2 border-gray-e bg-white">
                {{ title }}
                <button
                    @click="handleClick()"
                    @mousedown="handleCloseMousedown"
                    @mouseup="handleCloseMouseup"
                    @mouseleave="handleCloseMouseup"
                    aria-label="go-back-btn"
                    class="w-10 h-10 absolute left-5 top-1/2 -translate-y-1/2 flex justify-start lg:justify-center items-center rounded-full duration-200 lg:hover:bg-gray-e"
                >
                    <i class="text-xl mr-0.5 fa-solid fa-angle-left"></i>
                </button>
            </div>
            <Motion
                :initial="{ x: -40, opacity: 0 }"
                :animate="{ x: 0, opacity: 1 }"
                :transition="{ duration: 0.4 }"
                class="w-full flex justify-center"
            >
                <slot></slot>
            </Motion>
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