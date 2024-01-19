<template>
    <div v-if="show" class="w-full h-full fixed left-0 top-0 flex justify-center items-center text-black-333 bg-black-333/20">
        <div id="popup" class="animate-fade-in w-[48rem] p-14 relative rounded-lg drop-shadow bg-white">
            <button @click="handleClick()" class="w-10 h-10 absolute right-5 top-5 flex justify-center items-center rounded-full duration-100 lg:hover:bg-gray-e">
                <i class="text-2xl leading-none fa-solid fa-xmark"></i>
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