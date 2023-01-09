<template>
  <TodoWrapper>
    <template #content>
      <div>
        <h1 class="text-h5">Create Todo</h1>
        <q-separator />
        <div class="q-mt-md">
          <label for="title" class="text-subtitle2">Group Title</label>
          <q-input
            filled
            v-model="modelTitle"
            label="Filled"
            id="title"
            class="q-mt-sm"
          />
          <q-btn
            @click="addTodo"
            label="New Todo"
            class="q-mt-md bg-red-7 text-white"
            flat
            style="width: 100%"
          />
        </div>

        <div
          class="q-mt-md"
          style="display: flex; flex-direction: column; gap: 10px"
        >
          <Rowtodo
            :display="todo.display"
            :id="todo.id"
            v-for="todo in listTodo"
            :key="todo.id"
            @handle-change="changeTodo"
            @handle-remove="removeTodo"
          />
        </div>

        <transition
          appear
          :duration="1000"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div
            v-if="listTodo.length > 0"
            class="q-my-xl"
            style="display: flex; margin-left: auto; gap: 10px"
            :style="{
              width: $q.screen.gt.md || $q.screen.md ? 'fit-content' : '100%',
              flexDirection: $q.screen.gt.md || $q.screen.md ? 'row' : 'column',
            }"
          >
            <q-separator />
            <q-btn class="bg-green-7" label="Save" color="white" flat />
            <q-btn outline label="Clear" />
          </div>
        </transition>
      </div>
    </template>
  </TodoWrapper>
</template>

<script lang="ts">
import TodoWrapper from 'layouts/TodoWrapper.vue';
import Rowtodo from 'src/components/createtodo/RowTodo.vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
export default {
  components: {
    TodoWrapper,
    Rowtodo,
  },
  setup() {
    //types
    interface todo {
      id: string;
      value: string;
      display: boolean;
    }

    //variable
    const modelTitle = ref('');
    const listTodo = ref<todo[]>([]);
    const $q = useQuasar();

    //function
    function addTodo() {
      const id = crypto.randomUUID();
      listTodo.value.push({
        id,
        value: '',
        display: true,
      });
    }

    function removeTodo(id: string) {
      listTodo.value[
        listTodo.value.findIndex((todo) => todo.id === id)
      ].display = false;
      let timeout = setTimeout(() => {
        listTodo.value = listTodo.value.filter((todo) => todo.id !== id);
        clearTimeout(timeout);
      }, 300);
    }

    function changeTodo(e: any, id: string) {
      listTodo.value[listTodo.value.findIndex((todo) => todo.id === id)].value =
        e;
    }

    return {
      modelTitle,
      listTodo,
      $q,
      addTodo,
      removeTodo,
      changeTodo,
    };
  },
};
</script>
