<template>
    <footer class="w-full h-20 absolute left-0 bottom-0 z-40 flex justify-center items-center bg-white">
        <div class="flex justify-between items-center gap-3">
            <img src="/img/partiwon_logo.svg" class="w-6"/>
            <div class="text-sm text-gray-4"> 
                파티원 구함,<span class="font-light text-gray-666 ml-2">© 2023 - {{ date.getFullYear() }}</span>
            </div>
        </div>
    </footer>
    <div class="w-full h-16"></div>
</template>

<script setup lang="ts">
    const date = new Date();
</script>
