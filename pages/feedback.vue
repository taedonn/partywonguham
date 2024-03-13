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
                <div class="w-full my-5 flex">
                    <label for="email" class="w-36 h-full mt-3 pl-5 flex items-center shrink-0">이메일 주소 *</label>
                    <div class="w-full">
                        <input v-on:input="onEmailChange" id="email" type="text" placeholder="example@example.com" class="w-full px-3 py-2.5 border border-gray-9 placeholder-gray-9 focus:border-gray-4"/>
                        <div v-if="states.emailState !== ''" class="w-full mt-2 text-xs text-red-e">{{ 
                            states.emailState === "empty"
                                ? "이메일을 입력해 주세요."
                                : "이메일 형식이 올바르지 않아요."
                        }}</div>
                    </div>
                </div>
                <div class="w-full h-px bg-gray-4"></div>
                <div class="w-full my-5 flex">
                    <div class="w-36 h-full mt-3 pl-5 flex items-center shrink-0">문의 분류 *</div>
                    <div class="w-full flex flex-col">
                        <input v-on:change="onCategoryChange" type="checkbox" id="category" class="hidden peer"/>
                        <label for="category" v-on:mousedown="onMouseDown" v-bind:class="`${states.categoryShow ? 'border-gray-4' : 'border-gray-9'} category-select select group relative w-full px-3 py-2.5 cursor-pointer border placeholder-gray-9 focus:border-gray-4`">
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
                        <div v-if="states.categoryState !== ''" class="w-full mt-2 text-xs text-red-e">{{ 
                            states.categoryState === "empty" && "카테고리를 선택해 주세요."
                        }}</div>
                    </div>
                </div>
                <div class="w-full h-px bg-gray-d"></div>
                <div class="w-full my-5 flex">
                    <label for="title" class="w-36 h-full mt-3 pl-5 flex items-center shrink-0">문의 제목 *</label>
                    <div class="w-full">
                        <input v-on:input="onTitleChange" id="title" type="text" placeholder="제목을 입력해 주세요 (20자 이내)" maxlength="20" class="w-full px-3 py-2.5 border border-gray-9 placeholder-gray-9 focus:border-gray-4"/>
                        <div v-if="states.titleState !== ''" class="w-full mt-2 text-xs text-red-e">{{ 
                            states.titleState === "empty" && "제목을 입력해 주세요."
                        }}</div>
                    </div>
                </div>
                <div class="w-full h-px bg-gray-d"></div>
                <div class="w-full my-5 flex">
                    <label for="content" class="w-36 h-full mt-3 pl-5 flex items-center shrink-0">문의 내용</label>
                    <textarea v-on:input="onContentChange" id="content" class="w-full h-60 px-3 py-2.5 border border-gray-9 placeholder-gray-9 focus:border-gray-4"></textarea>
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
                    <input v-on:change="onCheck" v-bind:checked="states.agree" id="check" type="checkbox" class="peer hidden"/>
                    <label for="check" class="group w-5 h-5 flex justify-center items-center text-lg cursor-pointer">
                        <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                        <i class="peer-checked:group-[]:block hidden text-blue-1 fa-solid fa-square-check"></i>
                    </label>
                    <div class="mb-0.5">위 내용에 동의합니다.</div>
                </div>
                <div v-if="states.agreeState !== ''" class="w-full mt-2 text-xs text-red-e">{{ 
                    states.agreeState === "disagree" && "약관에 동의해야 문의를 제출할 수 있어요."
                }}</div>
                <div class="w-full mt-12 flex justify-end text-base">
                    <Button :click="onSubmit" :isLoading="states.isLoading" fill>문의하기</Button>
                </div>
            </div>
        </div>
    </main>
    <Toast/>
</template>

<script setup lang="ts">
    // Vue
    import { reactive, onMounted, onUnmounted } from 'vue';

    // Pinia
    import { useToastStore } from '~/stores/toast';
    const toastStore = useToastStore();

    // Components
    import Button from '~/components/Button.vue';
    import Toast from '~/components/Toast.vue';

    // Common
    import { emailValidChk } from '~/utils/common';

    // Types
    interface States {
        email: string,
        emailState: string,
        category: string,
        categoryShow: boolean,
        categoryState: string,
        title: string,
        titleState: string,
        content: string,
        agree: boolean,
        agreeState: string,
        isLoading: boolean,
    }

    // States
    const states: States = reactive({
        email: "",
        emailState: "",
        category: "카테고리 선택",
        categoryShow: false,
        categoryState: "",
        title: "",
        titleState: "",
        content: "",
        agree: false,
        agreeState: "",
        isLoading: false,
    });

    /** Email change event */
    const onEmailChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.email = el.value;
        states.emailState = "";
    }

    /** Show/hide category */
    const onCategoryChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.categoryShow = el.checked;
    }

    /** Select category option */
    const onCategoryClick = (e: Event) => {
        const el = e.target as HTMLLIElement;
        states.category = el.getAttribute("data-option") + "";
        states.categoryState = "";
    }

    /** Title change event */
    const onTitleChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.title = el.value;
        states.titleState = "";
    }

    /** Content change event */
    const onContentChange = (e: Event) => {
        const el = e.target as HTMLTextAreaElement;
        states.content = el.value;
    }

    /** Check terms agreement */
    const onCheck = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.agree = el.checked;
        if (el.checked) states.agreeState = "";
    }

    /** Show/hide category on mousedown */
    const onMouseDown = (e: MouseEvent) => {
        const el = e.target as HTMLElement;
        const category = document.getElementById("category") as HTMLInputElement;
        if (!el.classList.contains("select")) {
            category.checked = false;
            states.categoryShow = false;
        }
    }

    /** Submit event */
    const onSubmit = async () => {
        const width = window.innerWidth;
        const email = document.getElementById("email") as HTMLInputElement;
        const title = document.getElementById("title") as HTMLInputElement;
        const content = document.getElementById("content") as HTMLTextAreaElement;
        const agree = document.getElementById("check") as HTMLInputElement;

        if (states.email === "") {
            states.emailState = "empty";
            window.scrollTo({ top: width >= 1024 ? 80 : 160, behavior: 'smooth' });
        } else if (!emailValidChk(states.email)) {
            states.emailState = "invalid";
            window.scrollTo({ top: width >= 1024 ? 80 : 160, behavior: 'smooth' });
        } else if (states.category === "카테고리 선택") {
            states.categoryState = "empty";
            window.scrollTo({ top: width >= 1024 ? 80 : 160, behavior: 'smooth' });
        } else if (states.title === "") {
            states.titleState = "empty";
            window.scrollTo({ top: width >= 1024 ? 80 : 160, behavior: 'smooth' });
        } else if (!states.agree) {
            states.agreeState = "disagree";
        } else {
            states.isLoading = true;

            await $fetch("/api/sendemail", {
                method: "post",
                body: {
                    email: states.email,
                    category: states.category,
                    title: states.title,
                    content: states.content,
                }
            })
            .then(() => {
                // Reset fields
                email.value = "";
                states.email = "";
                title.value = "";
                states.title = "";
                content.value = "";
                states.content = "";
                agree.checked = false;

                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                toastStore.success({ text: "문의가 제출되었어요." });
            })
            .catch(err => console.log(err));

            states.isLoading = false;
        }
    }

    onMounted(() => {
        window.addEventListener("mousedown", onMouseDown);
    });

    onUnmounted(() => {
        window.removeEventListener("mousedown", onMouseDown);
    });
</script>
