<template>
    <footer class="w-full h-20 px-5 lg:px-0 absolute left-0 bottom-0 z-30 flex flex-col-reverse lg:flex-row justify-center items-center gap-2 lg:gap-0 bg-white text-black-3">
        <div class="flex justify-between items-center gap-2 lg:gap-2.5">
            <img src="/img/partywon_logo.svg" class="w-5 lg:w-6"/>
            <div class="text-xs lg:text-sm font-medium"> 
                파티원 구함,<span class="ml-2 font-light text-gray-6">© 2023 - {{ date.getFullYear() }}</span>
            </div>
        </div>
        <div class="flex lg:ml-8 gap-2 lg:gap-3 text-xs lg:text-sm font-light">
            <NuxtLink to='/privacy' class="lg:hover:text-blue-5 lg:hover:underline">개인정보 처리방침</NuxtLink>
            <NuxtLink to='https://github.com/taedonn/partywonguham' target="_blank" rel="noopener" class="lg:hover:text-blue-5 lg:hover:underline">깃허브 프로젝트</NuxtLink>
        </div>
    </footer>
    <div class="w-full h-20"></div>
</template>

<script setup lang="ts">
    const date = new Date();
</script>
