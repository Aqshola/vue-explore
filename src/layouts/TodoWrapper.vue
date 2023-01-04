<template>
  <q-layout
    container
    view="hhh ppp fff"
    style="min-height: 100vh"
    class="q-pa-md"
  >
    <q-header reveal class="bg-red-7">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration: none">
            Vue Todo
          </router-link>
        </q-toolbar-title>

        <q-btn to="/login" flat label="Sign Out" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-abov
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-red-7"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="calendar" />
            </q-item-section>
            <q-item-section> Schedule </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>
