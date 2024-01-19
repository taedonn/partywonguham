<template>
    <input
        type="text"
        :placeholder="placeHolder"
        class="w-full px-3 py-2 text-sm font-light outline-none border-b duration-100 border-gray-ccc lg:hover:border-gray-999 focus:border-blue-4 lg:focus:hover:border-blue-4 text-black-333 placeholder-gray-666"
    />
</template>

<script setup lang="ts">
    const props = defineProps({
        placeHolder: {
            type: String,
            required: false,
            default: "",
        },
    });
</script>

<style></style>
