<template>
    <header class="fixed z-40 top-0 w-full h-20 px-5 flex justify-center tracking-wide leading-relaxed backdrop-blur bg-white/80">
        <div class="relative z-10 max-w-[88rem] w-full flex justify-between items-center self-center">
            <NuxtLink to='/'>
                <h1 class="flex justify-between items-center gap-3 text-lg text-black-3"> 
                    <img src="/img/partiwon_logo.svg" class="w-6"/>
                    파티원 구함
                </h1>
            </NuxtLink>
            <ul class="flex items-center gap-4 text-sm font-light">
                <li><NuxtLink to='/' class="lg:hover:text-blue-1 lg:duration-200">일정 생성하기</NuxtLink></li>
                <li><NuxtLink to='/' class="lg:hover:text-blue-1 lg:duration-200">사용 가이드</NuxtLink></li>
                <li><NuxtLink to='/info' class="lg:hover:text-blue-1 lg:duration-200">프로젝트 정보</NuxtLink></li>
                <li><NuxtLink to='/feedback' class="lg:hover:text-blue-1 lg:duration-200">피드백 및 문의</NuxtLink></li>
            </ul>
        </div>
    </header>
</template>
