<template>
    <main class="w-full h-full absolute left-0 top-0 z-40 flex flex-col justify-center items-center text-center leading-normal text-black-3 bg-white">
        <img src="/img/404_error.png" alt="404 이미지" class="w-72"/>
        <div class="flex flex-col justify-center items-center -translate-y-6">
            <h2 class="text-xl font-bold">페이지를 찾을 수 없습니다.</h2>
            <h3 class="mt-3">
                요청하신 페이지가 존재하지 않거나, 
                변경되었거나, 삭제되었을 수도 있어요.
            </h3>
            <div class="w-40 mt-6">
                <Button>파티원구함 홈 가기</Button>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    
</script>
