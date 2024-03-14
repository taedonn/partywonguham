<template>
    <header class="fixed z-40 top-0 w-full h-20 px-5 flex justify-center tracking-wide leading-relaxed backdrop-blur-md bg-white/80">
        <div class="max-w-[88rem] w-full flex justify-between items-center self-center">
            <NuxtLink to='/' class="relative z-10">
                <h1 class="flex justify-between items-center gap-3 text-lg text-black-3"> 
                    <img src="/img/partiwon_logo.svg" class="w-6"/>
                    파티원 구함
                </h1>
            </NuxtLink>
            <div>
                <input v-on:change="onCheck" type="checkbox" id="menu" class="peer hidden"/>
                <label for="menu" class="group lg:hidden w-6 h-4 relative z-10 flex flex-col justify-between cursor-pointer">
                    <div class="peer-checked:group-[]:rotate-45 peer-checked:group-[]:top-[42%] relative w-full h-0.5 rounded-full bg-black-3 duration-200"></div>
                    <div class="peer-checked:group-[]:hidden w-full h-0.5 rounded-full bg-black-3"></div>
                    <div class="peer-checked:group-[]:-rotate-45 peer-checked:group-[]:bottom-[42%] relative w-full h-0.5 rounded-full bg-black-3 duration-200"></div>
                </label>
                <ul class="hidden peer-checked:flex absolute lg:static w-full h-[calc(100vh-5rem)] lg:h-auto lg:w-auto left-0 top-20 p-5 pt-0 lg:p-0 lg:flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-4 text-sm font-light bg-white/95 lg:bg-transparent">
                    <li><NuxtLink v-on:click="onClick" to='/' class="lg:hover:text-blue-1 lg:duration-200">일정 생성하기<i class="lg:hidden ml-2 text-xs fa-solid fa-angle-right"></i></NuxtLink></li>
                    <li><NuxtLink v-on:click="onClick" to='/' class="lg:hover:text-blue-1 lg:duration-200">사용 가이드<i class="lg:hidden ml-2 text-xs fa-solid fa-angle-right"></i></NuxtLink></li>
                    <li><NuxtLink v-on:click="onClick" to='/info' class="lg:hover:text-blue-1 lg:duration-200">프로젝트 정보<i class="lg:hidden ml-2 text-xs fa-solid fa-angle-right"></i></NuxtLink></li>
                    <li><NuxtLink v-on:click="onClick" to='/feedback' class="lg:hover:text-blue-1 lg:duration-200">피드백 및 문의<i class="lg:hidden ml-2 text-xs fa-solid fa-angle-right"></i></NuxtLink></li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    const onCheck = (e: Event) => {
        const el = e.target as HTMLInputElement;
        if (el.checked) document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");
    }

    const onClick = () => {
        const input = document.getElementById("menu") as HTMLInputElement;
        input.checked = false;
        document.body.classList.remove("overflow-hidden");
    }
</script>
