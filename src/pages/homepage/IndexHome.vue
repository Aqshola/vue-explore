<template>
  <q-page-container class="text-center">
    <q-page class="q-pt-xl">
      <div class="q-mb-none q-mx-auto" style="width: fit-content">
        <q-icon name="check_circle" size="70px" color="red-7" />
      </div>

      <h1
        class="lt-xl gt-md q-mb-none q-mt-md text-h1 sm:text-h2 text-center font-bold text-weight-medium"
      >
        Vue-Todos
      </h1>
      <h1
        class="lt-md q-mb-none q-mt-md text-h2 text-center font-bold text-weight-medium"
      >
        Vue-Todos
      </h1>
      <h1
        class="md q-mb-none q-mt-md text-h2 text-center font-bold text-weight-medium"
      >
        Vue-Todos
      </h1>
      <h2 class="text-subtitle1 text-center">
        Your standard <span class="text-red-7 text-weight-bold">TODO</span> but
        with <span class="text-green-7 text-weight-bold">VUE</span> flavour
      </h2>
      <q-btn color="red-7" label="Let's Todos" @click="openTodo" />
    </q-page>
  </q-page-container>
</template>

export
<script lang="ts">
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    function openTodo() {
      router.push('/login');
    }
    return {
      openTodo,
    };
  },
};
</script>
