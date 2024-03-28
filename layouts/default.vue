<template>
    <div class="font-sans relative min-h-screen overflow-hidden">
        <Header></Header>
        <slot></slot>
        <Footer></Footer>
        <Tooltip/>
    </div>
</template>

<script setup>
    import '../assets/style.css';

    useHead({
        title: "파티원구함 - 단체 약속 시간 정하기"
    });
</script>
