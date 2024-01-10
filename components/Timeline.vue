<template>
    <div class="w-full">
        <div class="w-full h-fit flex">
            <div class="flex flex-col shrink-0 mr-1.5">
                <div v-for="time in timeline" class="w-36 h-14 text-xs font-light flex items-center text-gray-666">{{ time }}</div>
            </div>
            <div class="w-full flex flex-col border rounded-lg overflow-hidden border-gray-ccc">
                <div v-for="checked, idx in checked_time" class="w-full flex flex-col flex-auto">
                    <div v-bind:class="`${checked.checked.length === 0 && idx % 2 === 0 && checked_time[idx - 1].checked.length === 0 ? 'bg-gray-ccc' : 'hidden'} w-full h-px`"></div>
                    <input type="checkbox" v-bind:id="`time-${checked.time}`" class="hidden"/>
                    <label
                        v-bind:for="`time-${checked.time}`"
                        v-bind:style="`opacity: ${blank ? 1 : checked.checked.length / (checked_time.length + 1)}`"
                        v-bind:class="`${blank ? '' : 'bg-blue-4'} w-full h-full`"
                    ></label>
                </div>
            </div>
        </div>
        <div class="w-full ml-36 pl-1.5 mt-3 text-xs font-light text-gray-666">
            <div class="flex items-center gap-2">
                <i class="text-[3px] text-gray-999 fa-solid fa-circle"></i> 시간은 30분 단위로 생성되며 중복해서 선택할 수 있습니다.
            </div>
            <div class="mt-1.5 flex items-center gap-2">
                <i class="text-[3px] text-gray-999 fa-solid fa-circle"></i> 일정은 해당 날짜가 지난 후 30일이 지나면 자동으로 폐기됩니다.
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        blank: {
            type: Boolean,
            required: false,
            default: false,
        },
        timeline: Array,
        checked_time: Array,
    });
</script>

<style>

</style>
