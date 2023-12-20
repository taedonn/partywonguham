<template>
    <div>
        <Header />
        <slot />
    </div>
</template>

<script>
import Header from '../components/Header'
import '../assets/style.css'

export default {
    name: 'default',
    components: {
        Header,
    }
}

</script>

<style>

</style>