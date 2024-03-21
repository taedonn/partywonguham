<template>
    <header class="fixed z-40 top-0 w-full h-16 px-5 flex justify-center border-b-2 border-gray-e bg-white">
        <div class="max-w-[48rem] w-full flex justify-between items-center self-center">
            <NuxtLink v-on:click="handleMenuOnClick" to='/' class="relative z-10">
                <img src="/img/logo_text.svg" alt="로고" class="h-6"/>
            </NuxtLink>
            <div>
                <input v-on:change="handleMenuOnCheck" type="checkbox" id="menu" class="peer hidden"/>
                <label for="menu" class="group lg:hidden w-6 h-4 relative z-10 flex flex-col justify-between cursor-pointer">
                    <div class="peer-checked:group-[]:rotate-45 peer-checked:group-[]:top-[44%] relative w-full h-0.5 rounded-full bg-black-3 duration-200"></div>
                    <div class="peer-checked:group-[]:hidden w-full h-0.5 rounded-full bg-black-3"></div>
                    <div class="peer-checked:group-[]:-rotate-45 peer-checked:group-[]:bottom-[42%] relative w-full h-0.5 rounded-full bg-black-3 duration-200"></div>
                </label>
                <ul class="hidden peer-checked:flex absolute lg:static w-full lg:w-auto h-[calc(100vh-4rem)] lg:h-auto text-base left-0 top-16 px-5 lg:px-0 py-6 lg:py-0 lg:flex flex-col lg:flex-row lg:items-center gap-5 text-black-3 bg-white lg:bg-transparent">
                    <li class="flex gap-2">
                        <div class="lg:hidden w-6 h-6 flex justify-center items-center rounded-lg border border-gray-c">
                            <i class="text-xs mt-px fa-solid fa-wand-magic-sparkles"></i>
                        </div>
                        <NuxtLink v-on:click="handleMenuOnClick" to='/create' class="lg:hover:text-blue-5">약속 잡기</NuxtLink>
                    </li>
                    <li class="flex gap-2">
                        <div v-bind:class="`${states.path.includes('feedback') ? 'border-blue-5 text-blue-5' : 'border-gray-c'} lg:hidden w-6 h-6 flex justify-center items-center rounded-lg border`">
                            <i class="text-xs mt-px fa-regular fa-comment-dots"></i>
                        </div>
                        <NuxtLink v-on:click="handleMenuOnClick" to='/feedback' v-bind:class="`${states.path.includes('feedback') ? 'text-blue-5 lg:text-black-3 font-bold lg:font-normal' : ''} lg:hover:text-blue-5`">피드백 및 문의</NuxtLink>
                    </li>
                    <li class="flex lg:hidden gap-2">
                        <div v-bind:class="`${states.path.includes('privacy') ? 'border-blue-5 text-blue-5' : 'border-gray-c'} w-6 h-6 flex justify-center items-center rounded-lg border`">
                            <i class="text-xs mt-px fa-solid fa-shield-halved"></i>
                        </div>
                        <NuxtLink v-on:click="handleMenuOnClick" to='/privacy' v-bind:class="`${states.path.includes('privacy') ? 'text-blue-5 lg:text-black-3 font-bold lg:font-normal' : ''} lg:hover:text-blue-5`">개인정보 처리방침</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <div class="w-full h-16"></div>
</template>

<script setup lang="ts">
    // Vue-router
    const route = useRoute();

    // Types
    interface States {
        path: String,
    }

    // States
    const states: States = reactive({
        path: "",
    });

    // Watch router params change
    watch(() => (route.params, route.path), async () => {
        handleMenuOnClick();
        handleMenuFocus(route.path);
    });

    /** 모바일에서 경로에 따라 메뉴 활성화 */
    const handleMenuFocus = (path: string) => {
        states.path = path;
    }

    const handleMenuOnCheck = (e: Event) => {
        const el = e.target as HTMLInputElement;
        if (el.checked) document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");
    }

    const handleMenuOnClick = () => {
        const input = document.getElementById("menu") as HTMLInputElement;
        input.checked = false;
        document.body.classList.remove("overflow-hidden");
    }
</script>
