<template>
    <div class="relative min-h-full">
        <Header/>
        <slot/>
        <Footer/>
    </div>
</template>

<script>
    import '../assets/style.css'
    import Footer from '~/components/Footer.vue';
</script>
