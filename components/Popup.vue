<template>
    <div v-if="show" class="w-full h-full fixed z-50 left-0 bottom-0 flex flex-col items-center overflow-y-auto text-black-3 bg-white">
        <div id="popup" class="w-full h-fit flex flex-col items-center">
            <div class="w-full h-16 relative flex justify-center items-center border-b-2 border-gray-e">
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
            </div>
            <div class="w-full flex justify-center px-5 lg:px-0 pt-12 lg:pt-24 pb-24">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        show: Boolean,
        handleShow: Function,
        title: {
            type: String,
            required: false,
            default: "",
        },
    });

    const handleClick = props.handleShow ? props.handleShow : () => { return }

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