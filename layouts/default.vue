<template>
    <main class="font-sans relative min-h-screen overflow-hidden">
        <Header></Header>
        <slot></slot>

        <!-- Google AdSense for PC -->
        <div class="hidden xl:flex absolute top-40 left-8">
            <Adsbygoogle
                :ad-style="{display: 'inline-block', width: 160 + 'px', height: 600 + 'px'}"
                ad-slot="6230757383"
            />
        </div>
        <div class="hidden xl:flex absolute top-40 right-8">
            <Adsbygoogle
                :ad-style="{display: 'inline-block', width: 160 + 'px', height: 600 + 'px'}"
                ad-slot="6230757383"
            />
        </div>

        <!-- Google AdSense for Mobile -->
        <div class="flex xl:hidden w-full justify-center">
            <Adsbygoogle
                :ad-style="{display: 'inline-block', width: 300 + 'px', height: 100 + 'px', marginBottom: 1 + 'rem'}"
                ad-slot="9257409816"
            />
        </div>

        <Footer></Footer>
        <Tooltip/>
    </main>
</template>

<script setup>
    import "../assets/style.css";

    useSeoMeta({
        title: "파티원구함 - 단체 약속 시간 확정 서비스",
        ogTitle: "파티원구함 - 단체 약속 시간 확정 서비스",
        description: "파티원구함은 단체 약속 시간 확정을 도와주는 웹 서비스에요. 인원수, 날짜, 시간을 정해 약속 페이지를 만들고, 링크를 공유해 인원수가 채워지면 이메일로 알림을 받을 수 있어요.",
        ogDescription: "파티원구함은 단체 약속 시간 확정을 도와주는 웹 서비스에요. 인원수, 날짜, 시간을 정해 약속 페이지를 만들고, 링크를 공유해 인원수가 채워지면 이메일로 알림을 받을 수 있어요.",
        ogImage: "https://partywonguham.s3.ap-northeast-2.amazonaws.com/meta_image.png",
        twitterCard: "https://partywonguham.s3.ap-northeast-2.amazonaws.com/meta_image_twitter.png"
    });
</script>
