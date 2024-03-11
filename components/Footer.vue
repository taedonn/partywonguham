<template>
    <footer class="w-full h-20 absolute left-0 bottom-0 z-40 flex justify-center items-center bg-white">
        <div class="flex justify-between items-center gap-2.5">
            <img src="/img/partiwon_logo.svg" class="w-6"/>
            <div class="text-sm text-gray-4"> 
                파티원 구함,<span class="font-light text-gray-6 ml-2">© 2023 - {{ date.getFullYear() }}</span>
            </div>
        </div>
        <div class="ml-8 flex gap-3 text-sm font-light text-black-3">
            <NuxtLink to='/privacy' class="text-sm lg:hover:text-blue-1 lg:hover:underline">개인정보 처리방침</NuxtLink>
            <NuxtLink to='https://github.com/taedonn/partywonguham' target="_blank" rel="noopener" class="text-sm lg:hover:text-blue-1 lg:hover:underline">깃허브 프로젝트</NuxtLink>
            <NuxtLink to='/' target="_blank" class="text-sm lg:hover:text-blue-1 lg:hover:underline">피드백 및 문의</NuxtLink>
        </div>
    </footer>
    <div class="w-full h-16"></div>
</template>

<script setup lang="ts">
    const date = new Date();
</script>
