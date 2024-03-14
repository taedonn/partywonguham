<template>
    <footer class="w-full h-20 px-5 lg:px-0 absolute left-0 bottom-0 z-30 tracking-wide leading-relaxed flex flex-col-reverse lg:flex-row justify-center items-center gap-2 lg:gap-0 bg-white">
        <div class="flex justify-between items-center gap-2 lg:gap-2.5">
            <img src="/img/partiwon_logo.svg" class="w-5 lg:w-6"/>
            <div class="text-xs lg:text-sm text-gray-4"> 
                파티원 구함,<span class="font-light text-gray-6 ml-2">© 2023 - {{ date.getFullYear() }}</span>
            </div>
        </div>
        <div class="flex lg:ml-8 gap-2 lg:gap-3 text-xs lg:text-sm font-light text-black-3">
            <NuxtLink to='/privacy' class="lg:hover:text-blue-1 lg:hover:underline">개인정보 처리방침</NuxtLink>
            <NuxtLink to='/feedback' class="lg:hover:text-blue-1 lg:hover:underline">피드백 및 문의</NuxtLink>
            <NuxtLink to='https://github.com/taedonn/partywonguham' target="_blank" rel="noopener" class="lg:hover:text-blue-1 lg:hover:underline">깃허브 프로젝트</NuxtLink>
        </div>
    </footer>
    <div class="w-full h-20"></div>
</template>

<script setup lang="ts">
    const date = new Date();
</script>
