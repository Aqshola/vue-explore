<template>
  <router-view v-if="!loading" />
  <div
    v-else
    style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <div>
      <q-spinner-pie size="50px" color="red-7" />
      <q-tooltip :offset="[0, 8]">Loading application</q-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeMount, onActivated } from 'vue';
import { loadUserLoggedIn } from 'src/service/auth';
import { useAuthStore } from './stores/authStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const loading = ref(false);
    const route = useRouter();
    async function checkSession() {
      await route.isReady();
      const currentRouteMode = route.currentRoute.value.meta.privilage;

      const result = await loadUserLoggedIn();
      const state = useAuthStore();
      const { clearAuth, setAuthIn } = state;

      if (!result.data) {
        clearAuth();
      } else {
        setAuthIn({
          email: result.data.email,
          name: result.data.name,
          id: result.data.id,
        });

        if (currentRouteMode === 'private') {
          route.go(-1);
        }

        if (currentRouteMode == 'public') {
          route.push({ name: 'todoIndex' });
        }
      }
    }

    onMounted(async () => {
      loading.value = true;
      await checkSession();
      loading.value = false;
    });

    return {
      loading,
    };
  },
});
</script>
