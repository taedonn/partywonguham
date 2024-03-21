<template>
    <main class="w-full flex justify-center px-5 lg:px-0 py-24 text-black-3">
        <div class="w-[48rem] text-center">
            <h2 class="text-2xl lg:text-3xl font-bold leading-normal">
                모임 일정 정하기!
            </h2>
            <h3 class="mt-5">
                몇 명이 참석하고 언제 모일지 정해요.
            </h3>
            <div class="w-full flex justify-center mt-12">
                <div class="w-72 h-12">
                    <Button :onClick="onClick" fill>약속 잡기</Button>
                </div>
            </div>
            <div class="w-full flex justify-center">
                <img class="w-full" src="/img/3d_running.png" alt="3D 남녀 달리기"/>
            </div>
            <div class="mt-20 lg:mt-8">
                <h2 class="text-2xl lg:text-3xl font-bold leading-normal">
                    언제 사용하면 좋을까요?
                </h2>
                <div class="w-full mt-12 lg:mt-16 text-sm lg:text-base flex justify-center leading-normal">
                    <div class="w-full max-w-fit flex flex-col gap-6 lg:gap-8 font-medium text-left">
                        <div class="w-full flex items-end lg:items-start gap-4">
                            <div class="w-12 h-12 lg:w-14 lg:h-14 shrink-0 rounded-full bg-blue-c overflow-hidden">
                                <img class="w-full" src="/img/3d_avatar_1.png" alt="3D 아바타 1"/>
                            </div>
                            <div class="msg relative h-fit px-6 py-3.5 rounded-full bg-blue-e before:bg-blue-e after:bg-white">
                                약속을 단톡에서 정하기 힘들어요.
                            </div>
                        </div>
                        <div class="w-full flex items-end lg:items-start gap-4">
                            <div class="w-12 h-12 lg:w-14 lg:h-14 shrink-0 rounded-full bg-blue-c overflow-hidden">
                                <img class="w-full" src="/img/3d_avatar_2.png" alt="3D 아바타 2"/>
                            </div>
                            <div class="msg relative h-fit px-6 py-3.5 rounded-full rounded-t-full bg-blue-e before:bg-blue-e after:bg-white">
                                모두가 가능한 시간을 한 눈에 보고 싶어요.
                            </div>
                        </div>
                        <div class="w-full flex items-end lg:items-start gap-4">
                            <div class="w-12 h-12 lg:w-14 lg:h-14 shrink-0 rounded-full bg-blue-c overflow-hidden">
                                <img class="w-full" src="/img/3d_avatar_3.png" alt="3D 아바타 3"/>
                            </div>
                            <div class="msg relative h-fit px-6 py-3.5 rounded-full bg-blue-e before:bg-blue-e after:bg-white">
                                약속에 대한 것들만 따로 기록하고 싶어요.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full mt-28 lg:mt-40">
                <h2 class="text-2xl lg:text-3xl font-bold leading-normal">
                    어떻게 사용해요?
                </h2>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    const router = useRouter();

    const onClick = () => {
        router.push("/create");
    }
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
</style>
