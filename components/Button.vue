<template>
    <button class="text-blue-4 bg-white rounded-lg border-blue-4 border-2 font-medium text-sm px-5 py-2.5 me-2 mb-2
                hover:bg-blue-4 hover:text-white
                focus:ring-4 focus:ring-blue-300 focus:outline-none"> 
                <slot> {{ button_txt }}</slot>
    </button>
</template>

<script>
export default {
    name: "Button",
    props:{
        // button_txt:{
        //     type : String,
        //     default : '',
        // }
    }
}
</script>

<style></style>
