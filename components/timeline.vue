<template>
    <div class="w-full h-fit flex">
        <div class="flex flex-col shrink-0 mr-1.5">
            <div v-for="time in timeline" class="w-40 h-14 text-sm font-light flex items-center">{{ time }}</div>
        </div>
        <div class="w-full flex flex-col border rounded-lg overflow-hidden border-gray-ccc">
            <div v-for="checked in checked_time" class="w-full flex flex-col flex-auto first:border-none odd:border-t border-gray-ccc">
                <input type="checkbox" v-bind:id="`time-${checked.time}`" class="hidden"/>
                <label
                    v-bind:for="`time-${checked.time}`"
                    v-bind:style="`opacity: ${checked.checked.length / (checked_time.length + 1)}`"
                    class="w-full h-full bg-blue-4"
                ></label>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        timeline: Array,
        checked_time: Array,
    });
</script>

<style>

</style>