<template>
    <footer class="w-full h-20 absolute left-0 bottom-0 z-30 text-sm flex flex-col-reverse justify-center items-center gap-2 bg-white text-black-3">
        <div class="flex justify-between items-center gap-2">
            <NuxtImg foramt="webp" src="/img/logo.svg" alt="파티원구함 아이콘" class="w-5"/>
            <div class="font-bold"> 
                파티원구함,<span class="ml-2 font-normal">© 2023-{{ date.getFullYear() }} 태돈.</span>
            </div>
        </div>
        <div class="flex gap-2">
            <NuxtLink to='/privacy' class="lg:hover:text-orange-f6 lg:hover:underline">개인정보 처리방침</NuxtLink>
            <NuxtLink to='https://github.com/taedonn/partywonguham' target="_blank" rel="noopener" class="lg:hover:text-orange-f6 lg:hover:underline">깃허브</NuxtLink>
        </div>
    </footer>
    <div class="w-full h-20"></div>
</template>

<script setup lang="ts">
    const date = new Date();
</script>
