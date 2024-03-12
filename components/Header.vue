<template>
    <header class="fixed z-40 top-0 w-full h-20 flex justify-center backdrop-blur bg-white/40">
        <div class="relative z-10 max-w-[100rem] w-full flex justify-between items-center self-center px-5 lg:px-8">
            <div class="flex justify-between items-center gap-3.5">
                <img src="/img/partiwon_logo.svg" class="w-8"/>
                <h1 class="text-xl text-black-3"> 
                    <NuxtLink to='/'>파티원 구함</NuxtLink>
                </h1>
            </div>
            <ul class="flex items-center gap-4">
                <li class="text-base"><NuxtLink to='/' class="lg:hover:text-blue-1 lg:duration-100">일정 생성하기</NuxtLink></li>
                <li class="text-base"><NuxtLink to='/' class="lg:hover:text-blue-1 lg:duration-100">사용 가이드</NuxtLink></li>
                <li class="text-base"><NuxtLink to='/' class="lg:hover:text-blue-1 lg:duration-100">프로젝트 정보</NuxtLink></li>
            </ul>
        </div>
    </header>
</template>
