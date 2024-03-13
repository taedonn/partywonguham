<template>
    <header class="fixed z-40 top-0 w-full h-20 flex justify-center tracking-wide leading-relaxed backdrop-blur bg-white/40">
        <div class="relative z-10 max-w-[100rem] w-full flex justify-between items-center self-center px-5 lg:px-8">
            <NuxtLink to='/'>
                <h1 class="flex justify-between items-center gap-3.5 text-xl text-black-3"> 
                    <img src="/img/partiwon_logo.svg" class="w-8"/>
                    파티원 구함
                </h1>
            </NuxtLink>
            <ul class="flex items-center gap-4">
                <li class="text-base"><NuxtLink to='/' class="lg:hover:text-blue-1 lg:duration-100">일정 생성하기</NuxtLink></li>
                <li class="text-base"><NuxtLink to='/' class="lg:hover:text-blue-1 lg:duration-100">사용 가이드</NuxtLink></li>
                <li class="text-base"><NuxtLink to='/info' class="lg:hover:text-blue-1 lg:duration-100">프로젝트 정보</NuxtLink></li>
                <li class="text-base"><NuxtLink to='/feedback' class="lg:hover:text-blue-1 lg:duration-100">피드백 및 문의</NuxtLink></li>
            </ul>
        </div>
    </header>
</template>
