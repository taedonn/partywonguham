<template>
    <main class="w-full flex justify-center px-5 lg:px-0 py-24 text-black-3">
        <div class="w-[48rem] text-center">
            <h2 class="text-2xl lg:text-3xl font-bold leading-normal">
                약속 시간 정하기!
            </h2>
            <h3 class="mt-5">
                몇 명이 참석하고 언제 모일지 정해요.
            </h3>
            <div class="w-full flex justify-center mt-12">
                <div class="w-72 h-12">
                    <Button :onClick="onClick">약속 잡기</Button>
                </div>
            </div>
            <div class="w-full flex justify-center">
                <img class="w-full" src="/img/3d_running.png" alt="3D 남녀 달리기"/>
            </div>
            <div class="mt-10 lg:mt-0">
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
                <div class="w-full flex flex-col items-center text-center leading-normal mt-12 lg:mt-16">
                    <div class="w-8 h-8 flex justify-center items-center rounded-full font-semibold bg-blue-e">1</div>
                    <div class="mt-8">
                        인원수, 날짜, 시간대를<br/>
                        선택해서 일정을 만들어요.
                    </div>
                    <div class="w-48 h-48 lg:w-60 lg:h-60 mt-8 relative rounded-full bg-blue-e">
                        <img src="/img/3d_calendar.png" alt="3D 캘린더" class="w-full scale-[1.15] -translate-x-2"/>
                    </div>
                    <div class="w-8 mt-20 h-8 flex justify-center items-center rounded-full font-semibold bg-blue-e">2</div>
                    <div class="mt-8">링크를 다른 사람들과 공유해요.</div>
                    <div class="w-48 h-48 lg:w-60 lg:h-60 mt-8 relative rounded-full bg-blue-e">
                        <img src="/img/3d_share.png" alt="3D 공유" class="w-full scale-[1.3]  lg:-translate-x-2"/>
                    </div>
                    <div class="w-8 mt-20 h-8 flex justify-center items-center rounded-full font-semibold bg-blue-e">3</div>
                    <div class="mt-8">
                        가능한 시간을 선택해요. 선택한<br/>
                        사람이 많은 시간대는 색이 진해져요.
                    </div>
                    <div class="w-48 h-48 lg:w-60 lg:h-60 mt-8 relative rounded-full bg-blue-e">
                        <img src="/img/3d_check.png" alt="3D 시간 체크" class="w-full scale-[1.4] -translate-x-2"/>
                    </div>
                    <div class="w-8 mt-20 h-8 flex justify-center items-center rounded-full font-semibold bg-blue-e">4</div>
                    <div class="mt-8">
                        알림 수신에 동의한 분들에 한해서<br/>
                        인원수가 채워지면 알림을 보내요.
                    </div>
                    <div class="w-48 h-48 lg:w-60 lg:h-60 mt-8 relative rounded-full bg-blue-e">
                        <img src="/img/3d_alarm.png" alt="3D 알람" class="w-full scale-[1.4] -translate-y-2"/>
                    </div>
                </div>
            </div>
            <div class="w-full mt-28 flex flex-col items-center">
                <h2 class="text-2xl lg:text-3xl font-bold leading-normal">
                    이제 약속을 만들어 보세요
                </h2>
                <h3 class="mt-5">
                    파티원구함은 유료 결제가 없는 무료 서비스에요.
                </h3>
                <div class="w-full flex justify-center mt-12">
                    <div class="w-72 h-12">
                        <Button :onClick="onClick">약속 잡기</Button>
                    </div>
                </div>
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
