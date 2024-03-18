<template>
    <main class="w-full flex justify-center px-5 lg:px-0 py-24 text-black-3">
        <div class="w-[48rem] text-center">
            <h2 class="text-3xl font-bold leading-normal">
                약속 일정을 만들고<br/>
                만날 시간을 정해요.
            </h2>
            <h3 class="mt-5">
                약속 일정을 만들고 만날 시간을 정해요.
            </h3>
            <div class="w-full flex justify-center mt-12">
                <div class="w-72 h-12">
                    <Button :onClick="onClick" fill>약속 만들기</Button>
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
