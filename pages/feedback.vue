<template>
    <main class="w-full flex justify-center px-5 lg:px-0 pt-5 lg:pt-24 pb-24 leading-relaxed text-black-3">
        <div class="w-[48rem]">
            <div class="msg-wrap relative lg:h-52 flex flex-col lg:flex-row items-center lg:justify-end gap-4 lg:gap-0 p-5 rounded-xl bg-orange-fe">
                <div class="msg relative lg:absolute lg:left-80 lg:top-10 px-5 lg:px-6 py-3 text-sm text-center lg:text-left leading-normal rounded-full text-white bg-orange-f6 before:bg-orange-f6 after:bg-orange-fe">
                    피드백이나 문의 사항이 있으시면 알려주세요.<br/>
                    최대한 빠른 시일 내에 답변 드릴게요.
                </div>
                <img src="/img/3d_feedback.png" alt="피드백 이미지" class="max-w-full w-60 lg:w-auto h-full lg:h-64 lg:absolute left-20 bottom-0"/>
            </div>
            <div class="mt-12 leading-relaxed">
                <div class="text-sm text-right"><span class="text-red-e">*</span> 필수 입력 사항</div>
                <div class="w-full h-px mt-2 bg-gray-4"></div>
                <div class="w-full my-5 flex">
                    <label for="email" class="w-32 lg:w-36 h-full mt-3 pl-5 flex items-center shrink-0 font-semibold">이메일 주소 <span class="ml-0.5 text-red-e">*</span></label>
                    <div class="w-full">
                        <input v-on:input="onEmailChange" id="email" type="text" placeholder="example@example.com" class="w-full px-3 py-2.5 border border-gray-6 placeholder-gray-9"/>
                        <div v-if="states.emailState.type === 'error'" class="w-full mt-2 text-xs text-red-e">
                            {{ states.emailState.msg }}
                        </div>
                    </div>
                </div>
                <div class="w-full h-px bg-gray-4"></div>
                <div class="w-full my-5 flex">
                    <div class="w-32 lg:w-36 h-full mt-3 pl-5 flex items-center shrink-0 font-semibold">문의 분류 <span class="ml-0.5 text-red-e">*</span></div>
                    <div class="w-full flex flex-col">
                        <input v-on:change="onCategoryChange" type="checkbox" id="category" class="hidden peer"/>
                        <label for="category" v-on:mousedown="onMouseDown" class="category-select select group relative w-full px-4 py-2.5 cursor-pointer border border-gray-6 placeholder-gray-9">
                            <div class="select relative w-full select-none">
                                {{ states.category }}
                                <i class="select peer-checked:group-[]:rotate-180 fa-solid fa-angle-down absolute right-1 top-1/2 -translate-y-1/2"></i>
                            </div>
                            <ul v-if="states.categoryShow" id="category-select" class="select w-[calc(100%+2px)] h-32 overflow-y-auto py-2 absolute z-10 -left-px top-[2.875rem] border border-gray-6 bg-white">
                                <li v-on:click="onCategoryClick" data-option="일반 문의" class="select select-none w-full px-4 py-1 lg:hover:bg-orange-fe">일반 문의</li>
                                <li v-on:click="onCategoryClick" data-option="오류 제보" class="select select-none w-full px-4 py-1 lg:hover:bg-orange-fe">오류 제보</li>
                                <li v-on:click="onCategoryClick" data-option="알림 수신 불가" class="select select-none w-full px-4 py-1 lg:hover:bg-orange-fe">알림 수신 불가</li>
                                <li v-on:click="onCategoryClick" data-option="개선·제안 사항" class="select select-none w-full px-4 py-1 lg:hover:bg-orange-fe">개선·제안 사항</li>
                                <li v-on:click="onCategoryClick" data-option="이메일 정보 삭제" class="select select-none w-full px-4 py-1 lg:hover:bg-orange-fe">이메일 정보 삭제</li>
                            </ul>
                        </label>
                        <div v-if="states.categoryState.type === 'error'" class="w-full mt-2 text-xs text-red-e">
                            {{ states.categoryState.msg }}
                        </div>
                    </div>
                </div>
                <div class="w-full h-px bg-gray-d"></div>
                <div class="w-full my-5 flex">
                    <label for="title" class="w-32 lg:w-36 h-full mt-3 pl-5 flex items-center shrink-0 font-semibold">문의 제목 <span class="ml-0.5 text-red-e">*</span></label>
                    <div class="w-full">
                        <input v-on:input="onTitleChange" id="title" type="text" placeholder="제목을 입력해 주세요 (20자 이내)" maxlength="20" class="w-full px-4 py-2.5 border border-gray-6 placeholder-gray-9"/>
                        <div v-if="states.titleState.type === 'error'" class="w-full mt-2 text-xs text-red-e">
                            {{ states.titleState.msg }}
                        </div>
                    </div>
                </div>
                <div class="w-full h-px bg-gray-d"></div>
                <div class="w-full my-5 flex">
                    <label for="content" class="w-32 lg:w-36 h-full mt-3 pl-5 flex items-center shrink-0 font-semibold">문의 내용</label>
                    <textarea v-on:input="onContentChange" id="content" class="w-full h-60 px-4 py-2.5 border border-gray-6 placeholder-gray-9"></textarea>
                </div>
                <div class="w-full h-px bg-gray-4"></div>
                <div class="text-base mt-12">개인정보 수집·이용에 대한 안내</div>
                <div class="font-semibold mt-3">(필수) 개인정보 수집·이용에 대한 안내</div>
                <div class="mt-8 text-gray-6">파티원 구함은 이용자 문의를 처리하기 위해 다음과 같이 개인정보를 수집 및 이용하며, 이용자의 개인정보를 안전하게 취급하는데 최선을 다하고 있습니다.</div>
                <div class="flex flex-col lg:flex-row mt-8 border-y-2 border-gray-d text-gray-6">
                    <div class="w-full lg:w-1/3 flex lg:block lg:border-r border-b lg:border-b-0 border-gray-d">
                        <div class="w-32 lg:w-full p-4 border-r lg:border-r-0 lg:border-b border-gray-d">수집 항목</div>
                        <div class="w-full p-4">이메일 주소</div>
                    </div>
                    <div class="w-full lg:w-1/3 flex lg:block lg:border-r border-b lg:border-b-0 border-gray-d">
                        <div class="w-32 lg:w-full p-4 border-r lg:border-r-0 lg:border-b border-gray-d">수집 목적</div>
                        <div class="w-full p-4">문의・요청・불편 사항 확인 및 처리결과 회신</div>
                    </div>
                    <div class="w-full lg:w-1/3 flex lg:block border-b lg:border-b-0 border-gray-d">
                        <div class="w-32 lg:w-full p-4 border-r lg:border-r-0 lg:border-b border-gray-d">보유 기간</div>
                        <div class="w-full p-4">6개월</div>
                    </div>
                </div>
                <div class="mt-8 text-gray-6">
                    위 동의를 거부 할 권리가 있으며, 동의를 거부하실 경우 문의 처리 및 결과 회신이 제한됩니다.<br class="hidden sm:block"/>
                    더 자세한 내용에 대해서는 <NuxtLink href="/privacy" class="underline underline-offset-2 font-semibold text-black-3 lg:hover:text-orange-f6">개인정보 처리방침</NuxtLink>을 참고하시기 바랍니다.
                </div>
                <div class="mt-10 flex items-center gap-2 text-black-3">
                    <input v-on:change="onCheck" v-bind:checked="states.agree" id="check" type="checkbox" class="peer hidden"/>
                    <label for="check" class="group w-5 h-5 flex justify-center items-center text-lg cursor-pointer">
                        <i class="peer-checked:group-[]:hidden block fa-regular fa-square-check"></i>
                        <i class="peer-checked:group-[]:block hidden text-orange-f6 fa-solid fa-square-check"></i>
                    </label>
                    <div class="mb-0.5">위 내용에 동의합니다.</div>
                </div>
                <div v-if="states.agreeState.type === 'error'" class="w-full mt-2 text-xs text-red-e">
                    {{ states.agreeState.msg }}
                </div>
                <div class="w-full mt-12 flex justify-end">
                    <div class="w-40 lg:w-44 h-12">
                        <Button :click="onSubmit" :isLoading="states.isLoading" fill>문의하기</Button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <Toast/>
</template>

<script setup lang="ts">
    // Pinia
    import { useToastStore } from '~/stores/toast';
    const toastStore = useToastStore();

    // Common
    import { emailValidChk } from '~/utils/common';

    // Types
    interface States {
        email: string,
        emailState: InputState,
        category: string,
        categoryShow: boolean,
        categoryState: InputState,
        title: string,
        titleState: InputState,
        content: string,
        agree: boolean,
        agreeState: InputState,
        isLoading: boolean,
    }

    interface InputState {
        type: string,
        msg: string,
    }

    // States
    const states: States = reactive({
        email: "",
        emailState: { type: "", msg: "" },
        category: "카테고리 선택",
        categoryShow: false,
        categoryState: { type: "", msg: "" },
        title: "",
        titleState: { type: "", msg: "" },
        content: "",
        agree: false,
        agreeState: { type: "", msg: "" },
        isLoading: false,
    });

    /** Email change event */
    const onEmailChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.email = el.value;
        states.emailState = { type: "", msg: "" };
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
        states.categoryState = { type: "", msg: "" };
    }

    /** Title change event */
    const onTitleChange = (e: Event) => {
        const el = e.target as HTMLInputElement;
        states.title = el.value;
        states.titleState = { type: "", msg: "" };
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
        if (el.checked) states.agreeState = { type: "", msg: "" };
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
            states.emailState = { type: "error", msg: "이메일을 입력해 주세요." };
            email.focus({ preventScroll: true });
            window.scrollTo({ top: width >= 1024 ? 80 : 160, behavior: 'smooth' });
        } else if (!emailValidChk(states.email)) {
            states.emailState = { type: "error", msg: "이메일 형식이 올바르지 않아요." };
            email.focus({ preventScroll: true });
            window.scrollTo({ top: width >= 1024 ? 80 : 160, behavior: 'smooth' });
        } else if (states.category === "카테고리 선택") {
            states.categoryState = { type: "error", msg: "카테고리를 선택해 주세요." };
            window.scrollTo({ top: width >= 1024 ? 80 : 160, behavior: 'smooth' });
        } else if (states.title === "") {
            states.titleState = { type: "error", msg: "제목을 입력해 주세요." };
            title.focus({ preventScroll: true });
            window.scrollTo({ top: width >= 1024 ? 80 : 160, behavior: 'smooth' });
        } else if (!states.agree) {
            states.agreeState = { type: "error", msg: "약관에 동의해야 문의를 제출할 수 있어요." };
            window.scrollTo({ top: document.body.offsetHeight, behavior: "smooth" });
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

    const onGlobalSubmit = (e: KeyboardEvent) => {
        if (e.key === "Enter") onSubmit();
    }

    onMounted(() => {
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("keydown", onGlobalSubmit);
    });

    onUnmounted(() => {
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("keydown", onGlobalSubmit);
    });
</script>

<style>
    .msg:before {
        content: "";
        position: absolute;
        z-index: 0;
        bottom: 0;
        left: -8px;
        height: 50%;
        width: 20px;
        border-bottom-right-radius: 16px;
    }
    .msg:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: -10px;
        width: 10px;
        height: 50%;
        border-bottom-right-radius: 10px;
    }
    @media screen and (max-width: 1023px) {
        .msg-wrap .msg:before {
            height: 20px;
            left: 70%;
            bottom: 4px;
            transform: translate(-50%, 20px);
        }
        .msg-wrap .msg:after {
            height: 17px;
            left: calc(70% - 6px);
            bottom: 3px;
            transform: translate(-50%, 20px);
        }
    }
</style>
