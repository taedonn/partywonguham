<template>
    <div class="font-sans relative min-h-screen overflow-hidden">
        <Header/>
        <slot></slot>
        <Footer/>
        <Tooltip/>
    </div>
</template>

<script setup>
    import "../assets/style.css";

    useSeoMeta({
        title: "파티원구함 - 단체 약속 시간 확정 서비스",
        ogTitle: "파티원구함 - 단체 약속 시간 확정 서비스",
        description: "파티원구함은 단체 약속 시간 확정을 도와주는 웹 서비스입니다. 처음 약속을 만드는 사람이 인원수, 날짜, 시간을 정한 후 약속 페이지를 생성하고, 링크를 복사해 다른 사람들에게 공유한 후, 인원수가 채워지면 이메일로 알림을 받을 수 있는 서비스입니다.",
        ogDescription: "파티원구함은 단체 약속 시간 확정을 도와주는 웹 서비스입니다. 처음 약속을 만드는 사람이 인원수, 날짜, 시간을 정한 후 약속 페이지를 생성하고, 링크를 복사해 다른 사람들에게 공유한 후, 인원수가 채워지면 이메일로 알림을 받을 수 있는 서비스입니다.",
        ogImage: "https://partywonguham.s3.ap-northeast-2.amazonaws.com/meta_image.png",
        twitterCard: "https://partywonguham.s3.ap-northeast-2.amazonaws.com/meta_image_twitter.png"
    });
</script>
