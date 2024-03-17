<template>
    <div v-bind:class="`${state.type === 'error' ? 'animate-shake' : ''} w-full relative text-black-3`">
        <input
            type="text"
            :placeholder="placeHolder"
            @input="onInputChange"
            v-bind:id="`${id}`"
            v-bind:class="`
                ${
                    icon === '' 
                        ? '' 
                        : 'pl-6'
                } ${
                    state.type === 'error'
                        ? 'border-red-e lg:hover:border-red-e focus:border-red-e lg:focus:hover:border-red-e'
                        : 'border-gray-9 lg:hover:border-gray-6 focus:border-blue-5 lg:focus:hover:border-blue-5'
                } w-full p-1.5 outline-none border-b duration-200 bg-transparent placeholder-gray-6
            `"
        />
        <i v-bind:class="`${icon} absolute left-0 top-1/2 -translate-y-1/2`"></i>
        <div v-if="state.type === 'error'" class="absolute left-0 -bottom-2 translate-y-full text-xs text-red-e">
            {{ state.msg }}
        </div>
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
        onChange: {
            type: Function,
            required: false,
            default: () => {}
        },
        state: {
            type: Object,
            required: false,
            default: {}
        },
        onStateChange: {
            type: Function,
            required: false,
            default: () => {}
        },
        id: String,
    });

    const onInputChange = (e: Event) => {
        props.onChange(e);
        props.onStateChange();
    }
</script>