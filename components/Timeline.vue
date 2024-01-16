<template>
    <div class="w-full">
        <div class="w-full h-fit flex">
            <div class="flex flex-col shrink-0 mr-1.5">
                <div v-for="time in timeline" class="w-36 h-14 text-xs font-light flex items-center text-gray-666">{{ time }}</div>
            </div>
            <div class="w-full flex flex-col border border-gray-d">
                <!-- 선택 화면 -->
                <div v-if="blank" v-for="checked, idx in checkedTime" class="group w-full flex flex-col flex-auto">
                    <input type="checkbox" v-bind:id="`time-${checked.time}`" class="peer hidden"/>
                    <label
                        v-bind:for="`time-${checked.time}`"
                        class="w-full h-full cursor-pointer duration-100 peer-checked:bg-blue-2 hover:bg-blue-1"
                    ></label>
                    <div v-bind:class="`${idx % 2 === 1 ? 'bg-gray-ccc' : 'hidden'} peer-checked:bg-white group-last:hidden w-full h-px`"></div>
                </div>
                <!-- 볼 화면 -->
                <div v-else v-for="checked, idx in checkedTime" class=" group w-full relative flex flex-col flex-auto">
                    <div v-bind:class="`${checked.checked.length === 0 && idx % 2 === 0 && checkedTime[idx - 1].checked.length === 0 ? 'bg-gray-ccc' : 'hidden'} w-full h-px`"></div>
                    <div
                        v-bind:style="`opacity: ${checked.checked.length / (checkedTime.length + 1)}`"
                        v-bind:class="`w-full h-full bg-blue-4 duration-100`"
                    >
                    </div>
                    <div v-if="checked.checked.length !== 0" class="w-full h-full absolute group-hover:bg-blue-4 opacity-20 cursor-pointer duration-100"></div>
                    <div v-if="checked.checked.length !== 0" class="w-max invisible group-hover:visible px-3 py-2 absolute z-10 bottom-1/2 left-[80%] -translate-x-1/2 -translate-y-2 scale-50 group-hover:scale-100 opacity-0 group-hover:opacity-100 text-sm font-light rounded-md origin-bottom duration-100 text-white bg-black-333">
                        <div v-for="person in checked.checked" class="">{{ person }}</div>
                        <div class="w-2.5 h-2.5 rotate-45 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-black-333"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!blank" class="w-full ml-36 pl-1.5 mt-3 text-xs font-light text-gray-999">
            <div class="flex items-center gap-2">
                <i class="text-[0.188rem] fa-solid fa-circle"></i> 시간은 30분 단위로 생성되며 중복해서 선택할 수 있습니다.
            </div>
            <div class="mt-1.5 flex items-center gap-2">
                <i class="text-[0.188rem] fa-solid fa-circle"></i> 일정은 해당 날짜가 지난 후 30일이 지나면 자동으로 폐기됩니다.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    interface CheckedTime {
        time: number,
        checked: Array<string>
    }

    const props = defineProps({
        blank: {
            type: Boolean,
            required: false,
            default: false,
        },
        timeline: Array,
        checked_time: Array<CheckedTime>,
    });

    const checkedTime = props.checked_time ? props.checked_time : [];
</script>

<style>

</style>
