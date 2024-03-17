<template>
    <div class="font-sans relative min-h-screen overflow-hidden font-serif">
        <Header></Header>
        <slot></slot>
        <Footer></Footer>
    </div>
</template>

<script>
    import '../assets/style.css';
    import Header from '~/components/Header.vue';
    import Footer from '~/components/Footer.vue';
</script>
