<template>
    <div class="w-full relative text-sm font-light text-black-333">
        <input
            type="text"
            :placeholder="placeHolder"
            v-bind:id="`${id}`"
            v-bind:class="`${icon === '' ? '' : 'pl-6'} w-full py-2 outline-none border-b duration-100 border-gray-999 lg:hover:border-gray-666 focus:border-blue-4 lg:focus:hover:border-blue-4 placeholder-gray-666`"
        />
        <i v-bind:class="`${icon} absolute left-0 top-1/2 -translate-y-1/2`"></i>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        placeHolder: {
            type: String,
            required: false,
            default: ""
        },
        icon: {
            type: String,
            required: false,
            default: ""
        },
        id: String,
    });
</script>