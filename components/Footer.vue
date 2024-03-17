<template>
    <footer class="w-full h-20 px-5 absolute left-0 bottom-0 z-30 flex flex-col-reverse justify-center items-center gap-2 bg-white text-black-3">
        <div class="flex justify-between items-center gap-2">
            <img src="/img/partywon_logo.svg" class="w-5"/>
            <div class="text-xs font-semibold"> 
                파티원 구함,<span class="ml-2 font-normal text-gray-6">© 2023 - {{ date.getFullYear() }}</span>
            </div>
        </div>
        <div class="flex gap-2 text-xs">
            <NuxtLink to='/privacy' class="lg:hover:text-blue-5 lg:hover:underline">개인정보 처리방침</NuxtLink>
            <NuxtLink to='https://github.com/taedonn/partywonguham' target="_blank" rel="noopener" class="lg:hover:text-blue-5 lg:hover:underline">깃허브 프로젝트</NuxtLink>
        </div>
    </footer>
    <div class="w-full h-20"></div>
</template>

<script setup lang="ts">
    const date = new Date();
</script>
