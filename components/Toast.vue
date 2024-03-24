<template>
    <Teleport to="body">
        <Transition name="toast">
            <div v-if="toastStore.toasts.length" class="font-sans w-full fixed z-40 bottom-4 flex justify-center">
                <TransitionGroup name="toast" tag="ul" class="flex flex-col gap-2.5 duration-400">
                    <li
                        v-for="toast in toastStore.toasts"
                        class="px-5 py-2.5 gap-2 relative rounded-full flex items-center text-sm overflow-hidden text-white bg-orange-f6 drop-shadow-lg"
                        :key="toast.text"
                    >
                        <i v-bind:class="`${
                            toast.status === 'success' 
                                ? 'fa-solid fa-circle-check text-orange-fe'
                                : 'fa-solid fa-circle-exclamation text-white'
                        }`"></i>
                        <span>{{ toast.text }}</span>
                    </li>
                </TransitionGroup>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
    import { useToastStore } from "~/stores/toast";
    const toastStore = useToastStore();
</script>

<style scoped>
    .toast-enter-from,
    .toast-leave-to {
        transform: scale(0.75) translateY(100%);
        opacity: 0;
    }

    .toast-enter-active,
    .toast-leave-active {
        transition: 0.4s ease all;
    }
</style>