<template>
  <transition
    appear
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutRight"
    :duration="300"
  >
    <div style="display: flex; gap: 5px" v-if="display">
      <q-input
        v-model="valueInput"
        outlined
        style="width: 100%"
        label="todo name"
      />
      <q-btn
        flat
        class="bg-red-10"
        color="white"
        icon="delete"
        @click="$emit('handleRemove', id)"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { emit } from 'process';
import { ref, watch } from 'vue';
export default {
  props: {
    display: Boolean,
    id: String,
    inputValue: String,
  },

  emits: ['handleRemove', 'handleChange'],
  setup(props, { emit }) {
    const valueInput = ref(props.inputValue);

    //watch
    watch(valueInput, (newValue) => {
      emit('handleChange', newValue, props.id);
    });
    return {
      valueInput,
    };
  },
};
</script>
