<template>
    <div v-if="show" class="w-full h-full fixed z-20 left-0 top-0 px-4 lg:px-8 flex justify-center overflow-y-auto text-black-333 bg-black-333/20">
        <div id="popup" class="animate-fade-in w-full max-w-[48rem] h-fit my-20 p-8 lg:p-16 relative rounded-lg drop-shadow bg-white">
            <button
                @click="handleClick()"
                @mousedown="handleCloseMousedown"
                @mouseup="handleCloseMouseup"
                @mouseleave="handleCloseMouseup"
                class="w-10 h-10 absolute right-5 top-5 flex justify-center items-center rounded-full duration-100 lg:hover:bg-gray-e"
            >
                <i class="text-3xl leading-none bi bi-x"></i>
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
    const handleKeydown = (e: KeyboardEvent) => { if (e.key === "Escape" && props.show) handleClick(); }
    const handleMousedown = (e: MouseEvent) => {
        let popup = document.getElementById("popup");
        let target = e.target as HTMLElement; // e.target에서 HTMLElement만 분리
        if (e.target) {
            if (target.contains(popup) && target !== popup) handleClick();
        }
    }

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

    // 컴포넌트가 마운트 된 후 실행될 콜백
    onMounted(() => {
        window.addEventListener("keydown", handleKeydown);
        window.addEventListener("mousedown", handleMousedown);
    });

    // 컴포넌트가 마운토 해제되기 직전에 실행될 콜백
    onBeforeUnmount(() => {
        window.removeEventListener("keydown", handleKeydown);
        window.removeEventListener("mousedown", handleMousedown);
    });
</script>

<style>

</style>