<template>
    <div class="w-full">
        <div class="w-full h-fit flex">
            <div class="flex flex-col shrink-0">
                <div v-for="time in timeline" class="w-12 h-14 text-xs font-light pt-0.5">{{ time }}</div>
            </div>
            <div class="w-full flex flex-col border border-gray-ccc">
                <!-- 선택 화면 -->
                <div v-if="blank" v-for="checked in checkedTime" class="group relative w-full flex flex-col flex-auto">
                    <input
                        type="checkbox"
                        v-bind:id="`time-${checked.time}`"
                        class="peer hidden"
                    />
                    <div
                        v-bind:data-id="`time-${checked.time}`"
                        class="w-full h-[calc(100%+1px)] group-first:h-full absolute z-10 bottom-0 cursor-[row-resize] duration-100 peer-checked:bg-blue-4/40 lg:hover:bg-blue-4/20"
                        @mouseover="onMouseOver"
                        @mousedown="onMouseDown"
                    ></div>
                    <div class="group-last:hidden w-full h-px absolute bottom-0 cursor-[row-resize] bg-gray-ccc peer-checked:bg-gray-ccc/60"></div>
                </div>
                <!-- 볼 화면 -->
                <div v-else v-for="checked in checkedTime" class=" group w-full relative flex flex-col flex-auto">
                    <div
                        v-bind:style="`opacity: ${checked.checked.length / (checkedTime.length + 1)}`"
                        v-bind:class="`w-full h-[calc(100%+1px)] group-first:h-full absolute z-10 bottom-0 bg-blue-4 duration-100`"
                    >
                    </div>
                    <div v-if="checked.checked.length !== 0" class="w-full h-[calc(100%+1px)] group-first:h-full absolute z-10 bottom-0 group-hover:bg-blue-4 opacity-20 cursor-pointer duration-100"></div>
                    <div v-if="checked.checked.length !== 0" class="w-max invisible group-hover:visible px-3 py-2 absolute z-10 bottom-1/2 left-[80%] -translate-x-1/2 -translate-y-2 scale-50 group-hover:scale-100 opacity-0 group-hover:opacity-100 text-sm font-light rounded-md origin-bottom drop-shadow duration-100 text-white bg-black-333">
                        <div v-for="person in checked.checked" class="">{{ person }}</div>
                        <div class="w-2.5 h-2.5 rotate-45 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-black-333"></div>
                    </div>
                    <div class="group-last:hidden w-full h-px absolute bottom-0 bg-gray-ccc"></div>
                </div>
            </div>
        </div>
        <div v-if="!blank" class="w-full ml-12 mt-4 text-xs font-light text-gray-666">
            <div class="flex items-center gap-2">
                <i class="text-[0.188rem] fa-solid fa-circle"></i> 시간은 30분 단위로 생성되고 중복해서 선택할 수 있어요.
            </div>
            <div class="mt-1.5 flex items-center gap-2">
                <i class="text-[0.188rem] fa-solid fa-circle"></i> 일정은 해당 날짜가 지난 후 30일이 지나면 자동으로 폐기돼요.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted } from 'vue';

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

    let isChecked = false;
    let isMouseDown = false;

    const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        const el = e.target as HTMLDivElement;
        const id = el.getAttribute("data-id") + "";
        const input = document.getElementById(id) as HTMLInputElement;
        input.checked = !input.checked;
        isChecked = input.checked;
    }

    const onMouseOver = (e: MouseEvent) => {
        const el = e.target as HTMLDivElement;
        const id = el.getAttribute("data-id") + "";
        const input = document.getElementById(id) as HTMLInputElement;
        if (isMouseDown) input.checked = isChecked;
    }

    const onGlobalMouseDown = () => { isMouseDown = true; }
    const onGlobalMouseUp = () => { isMouseDown = false; }

    onMounted(() => {
        window.addEventListener("mousedown", onGlobalMouseDown);
        window.addEventListener("mouseup", onGlobalMouseUp);
    });

    onUnmounted(() => {
        window.removeEventListener("mousedown", onGlobalMouseDown);
        window.removeEventListener("mouseup", onGlobalMouseUp);
    })
</script>

<style>

</style>
