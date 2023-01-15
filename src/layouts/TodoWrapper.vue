<template>
  <q-layout
    container
    view="hhh ppp fff"
    style="min-height: 100vh"
    class="q-pa-md"
  >
    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-white column justify-between"
      :class="{ 'q-pb-xl': $q.screen.md || $q.screen.gt.md }"
    >
      <!-- <q-scroll-area class="fit column justify-between"> -->
      <q-item>
        <q-item-section avatar style="min-width: 0; width: fit-content">
          <q-icon name="account_circle" size="lg" />
        </q-item-section>
        <q-item-section style="width: 50px">
          <h5 class="text-subtitle2 q-ma-none q-pa-none">
            {{ authData.userData?.name }}
          </h5>
        </q-item-section>
        <q-space />
        <q-item-section avatar>
          <q-icon name="settings" size="xs" />
        </q-item-section>
      </q-item>
      <q-separator />
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="today" />
          </q-item-section>
          <q-item-section> Today </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="date_range" />
          </q-item-section>
          <q-item-section> All</q-item-section>
        </q-item>
      </q-list>
      <q-item class="col-grow"> </q-item>
      <q-item clickable v-ripple>
        <q-btn
          icon="logout"
          label="logout"
          flat
          style="padding-left: 0px"
          @click="handleLogout"
        />
      </q-item>
      <!-- </q-scroll-area> -->
    </q-drawer>

    <q-footer class="bg-red-7" reveal>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <slot name="footer"></slot>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <q-page class="q-px-md">
        <slot name="content"></slot>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { logout } from 'src/service/auth';
import { useAuthStore } from 'stores/authStore';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const $q = useQuasar();
    const state = useAuthStore();
    const { clearAuth, authData } = state;
    const router = useRouter();

    async function handleLogout() {
      await logout();
      clearAuth();
      router.push({ name: 'login' });
    }
    return {
      drawer: ref(false),
      $q,
      authData,
      handleLogout,
    };
  },
};
</script>
