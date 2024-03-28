<template>
    <div class="font-sans relative min-h-screen overflow-hidden">
        <Header/>
        <slot></slot>
        <Footer/>
        <Tooltip/>
    </div>
</template>

<script setup>
    import "../assets/style.css";

    useSeoMeta({
        title: "파티원구함 - 단체 약속 확정 서비스",
        ogTitle: "파티원구함 - 단체 약속 확정 서비스",
        description: "파티원구함은 단체 약속 확정을 도와주는 웹 기반 서비스입니다.",
        ogDescription: "파티원구함은 단체 약속 확정을 도와주는 웹 기반 서비스입니다.",
    });
</script>
