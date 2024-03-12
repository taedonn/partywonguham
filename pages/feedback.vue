<template>
    <main class="w-full flex justify-center px-5 lg:px-16 p-20 lg:pt-40 tracking-wide leading-relaxed text-black-3">
        <div class="w-[48rem]">
            <div class="px-6 lg:px-8 py-6 rounded-lg bg-gray-f">
                <h2 class="text-lg">피드백 및 문의</h2>
                <h3 class="mt-3 text-sm font-light">
                    피드백이나 문의 사항이 있으시면 알려주세요.<br/>
                    최대한 빠른 시일 내에 답변 드릴게요.
                </h3>
            </div>
            <div class="mt-12 text-sm font-light">
                <div class="text-xs font-light text-right">* 필수 입력 사항</div>
                <div class="w-full h-px mt-2 bg-gray-4"></div>
                <div class="w-full h-20 flex items-center">
                    <label for="email" class="w-36 h-full pl-5 flex items-center shrink-0">이메일 주소 *</label>
                    <input id="email" placeholder="example@example.com" class="w-full px-3 py-2.5 border border-gray-9 placeholder-gray-9 focus:border-gray-4"/>
                </div>
                <div class="w-full h-px bg-gray-4"></div>
                <div class="w-full h-20 flex items-center">
                    <div class="w-36 h-full pl-5 flex items-center shrink-0">문의 분류 *</div>
                    <input v-on:change="onCategoryChange" type="checkbox" id="category" class="hidden peer"/>
                    <label for="category" v-on:mousedown="onMouseDown" v-bind:class="`${states.categoryShow ? 'border-gray-4' : 'border-gray-9'} select group relative w-full px-3 py-2.5 cursor-pointer border placeholder-gray-9 focus:border-gray-4`">
                        <div class="select relative w-full select-none">
                            {{ states.category }}
                            <i class="select peer-checked:group-[]:rotate-180 fa-solid fa-angle-down absolute right-1 top-1/2 -translate-y-1/2"></i>
                        </div>
                        <ul v-if="states.categoryShow" id="category-select" class="select w-[calc(100%+2px)] h-32 overflow-y-auto py-2 absolute z-10 -left-px top-[2.5rem] border border-gray-4 bg-white">
                            <li v-on:click="onCategoryClick" data-option="일반 문의" class="select select-none w-full px-4 py-1 lg:hover:bg-gray-f">일반 문의</li>
                            <li v-on:click="onCategoryClick" data-option="오류 제보" class="select select-none w-full px-4 py-1 lg:hover:bg-gray-f">오류 제보</li>
                            <li v-on:click="onCategoryClick" data-option="알림 수신 불가" class="select select-none w-full px-4 py-1 lg:hover:bg-gray-f">알림 수신 불가</li>
                            <li v-on:click="onCategoryClick" data-option="개선·제안 사항" class="select select-none w-full px-4 py-1 lg:hover:bg-gray-f">개선·제안 사항</li>
                            <li v-on:click="onCategoryClick" data-option="이메일 정보 삭제" class="select select-none w-full px-4 py-1 lg:hover:bg-gray-f">이메일 정보 삭제</li>
                        </ul>
                    </label>
                </div>
                <div class="w-full h-px bg-gray-d"></div>
                <div class="w-full h-20 flex items-center">
                    <label for="title" class="w-36 h-full pl-5 flex items-center shrink-0">문의 제목 *</label>
                    <input id="title" placeholder="제목을 입력해 주세요 (20자 이내)" maxlength="20" class="w-full px-3 py-2.5 border border-gray-9 placeholder-gray-9 focus:border-gray-4"/>
                </div>
                <div class="w-full h-px bg-gray-d"></div>
                <div class="w-full my-5 flex">
                    <label for="content" class="w-36 h-full mt-3 pl-5 flex items-center shrink-0">문의 내용</label>
                    <textarea id="content" class="w-full h-60 px-3 py-2.5 border border-gray-9 placeholder-gray-9 focus:border-gray-4"></textarea>
                </div>
                <div class="w-full h-px bg-gray-4"></div>
                <div class="text-base mt-12">개인정보 수집·이용에 대한 안내</div>
                <div class="font-medium mt-3">(필수) 개인정보 수집·이용에 대한 안내</div>
                <div class="mt-8 text-gray-6">파티원 구함은 이용자 문의를 처리하기 위해 다음과 같이 개인정보를 수집 및 이용하며, 이용자의 개인정보를 안전하게 취급하는데 최선을 다하고 있습니다.</div>
                <div class="mt-8 border-y-2 border-gray-d text-gray-9">
                    <div class="w-full flex border-b border-gray-d">
                        <div class="w-1/3 p-4">수집 항목</div>
                        <div class="w-1/3 p-4 border-l border-gray-d">수집 목적</div>
                        <div class="w-1/3 p-4 border-l border-gray-d">보유 기간</div>
                    </div>
                    <div class="w-full flex">
                        <div class="w-1/3 p-4">이메일 주소</div>
                        <div class="w-1/3 p-4 border-l border-gray-d">문의・요청・불편 사항 확인 및 처리결과 회신</div>
                        <div class="w-1/3 p-4 border-l border-gray-d">6개월</div>
                    </div>
                </div>
                <div class="mt-8 text-gray-6">
                    위 동의를 거부 할 권리가 있으며, 동의를 거부하실 경우 문의 처리 및 결과 회신이 제한됩니다.<br/>
                    <br/>
                    더 자세한 내용에 대해서는 <NuxtLink href="/privacy" class="underline underline-offset-2 text-black-3 lg:hover:text-blue-1">개인정보 처리방침</NuxtLink>을 참고하시기 바랍니다.
                </div>
                <div class="mt-10 flex items-center gap-2 text-black-3">
                    <input id="check" type="checkbox" class="peer hidden"/>
                    <label for="check" class="group w-5 h-5 flex justify-center items-center text-lg cursor-pointer">
                        <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                        <i class="peer-checked:group-[]:block hidden text-blue-1 fa-solid fa-square-check"></i>
                    </label>
                    <div class="mb-0.5">위 내용에 동의합니다.</div>
                </div>
                <div class="w-full mt-12 flex justify-end">
                    <button class="w-44 h-12 rounded-md text-base bg-blue-1 text-white">문의하기</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    // Vue
    import { reactive, onMounted, onUnmounted } from 'vue';

    // Types
    interface States {
        category: string,
        categoryShow: boolean,
    }

    // States
    const states: States = reactive({
        category: "카테고리 선택",
        categoryShow: false,
    });

    const onCategoryChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.categoryShow = el.checked;
    }

    const onCategoryClick = (e: Event) => {
        const el = e.target as HTMLLIElement;
        states.category = el.getAttribute("data-option") + "";
    }

    const onMouseDown = (e: MouseEvent) => {
        const el = e.target as HTMLElement;
        const category = document.getElementById("category") as HTMLInputElement;
        if (!el.classList.contains("select")) {
            category.checked = false;
            states.categoryShow = false;
        }
    }

    onMounted(() => {
        window.addEventListener("mousedown", onMouseDown);
    });

    onUnmounted(() => {
        window.removeEventListener("mousedown", onMouseDown);
    });
</script>
