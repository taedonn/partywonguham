<template>
    <header class="fixed top-0 w-full flex justify-center">
        <div class="max-w-[100rem] w-full flex justify-between items-center self-center px-4 lg:px-8 my-7">
            <div class="flex justify-between items-center gap-3.5">
                <img src="/img/partiwon_logo.svg" />
                <h1 class="text-xl text-black-333"> 
                    <nuxt-link to='/'>파티원 구함</nuxt-link>
                </h1>
            </div>
            <ul class="flex items-center gap-4">
                <li class="w-40 text-sm font-light">
                    <Input
                        placeHolder="아이디로 일정 조회"
                        id="search-id"
                        icon="bi bi-search"
                    />
                </li>
                <li class="text-base"><nuxt-link to='/' class="lg:hover:text-blue-4 lg:duration-100">일정 생성하기</nuxt-link></li>
                <li class="text-base"><nuxt-link to='/' class="lg:hover:text-blue-4 lg:duration-100">사용 가이드</nuxt-link></li>
                <li class="text-base"><nuxt-link to='/' class="lg:hover:text-blue-4 lg:duration-100">프로젝트 정보</nuxt-link></li>
            </ul>
        </div>
    </header>
</template>

<script setup lang="ts">
    import Input from "~/components/Input.vue";
</script>

<style>

</style>
