<template>
  <q-page-container>
    <q-page>
      <div class="row" style="height: 100vh">
        <div class="col-md-6 gt-sm bg-red-7 q-pa-xl" style="height: 100%">
          <h2 class="text-h3 text-white">VueDo</h2>
          <p class="text-h5 text-white">Make Your Scheduling Task Easier</p>
        </div>
        <div class="col-md-6 col-12 q-pa-xl">
          <h1 class="text-h3 text-center text-weight-bold">Login</h1>
          <q-form
            @submit.prevent="handleLogin"
            class="q-gutter-md q-mt-xl"
            v-bind:style="{
              width: $q.screen.md || ($q.screen.gt.md && '500px'),
              margin: $q.screen.md || ($q.screen.gt.md && 'auto'),
            }"
          >
            <q-banner
              dense
              class="bg-red text-white"
              inline-actions
              rounded
              v-if="alertError"
            >
              <template v-slot:avatar>
                <q-icon name="warning" color="white" />
              </template>
              <span> Auth Credential Error </span>

              <template v-slot:action>
                <q-btn flat label="Close" @click="closeError" />
              </template>
            </q-banner>

            <q-input
              outlined
              v-model="form.email"
              label="Email"
              lazy-rules
              :rules="[
                (val) => !!val || 'Field is required',
                (val, rules) =>
                  rules.email(val) || 'Please enter a valid email address',
              ]"
            />

            <div>
              <q-input
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) => val.length >= 6 || 'Minimum password 6 character',
                ]"
                type="password"
                outlined
                v-model="form.password"
                label="Password"
                lazy-rules
                class="q-mb-sm"
              />
              <router-link
                to="/"
                style="text-decoration: none"
                class="text-subtitle-2 text-blue-7"
                >Forgot Password</router-link
              >
            </div>

            <div>
              <q-btn
                :loading="loading"
                glossy
                label="Login"
                type="submit"
                color="blue-7"
                style="width: 100%"
              />
            </div>
            <div class="q-mt-md">
              <span> Didn't have ccount ? </span>
              <router-link
                to="/register"
                style="text-decoration: none"
                class="text-weight-medium text-blue-7"
                >Register</router-link
              >
            </div>
          </q-form>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { login } from 'src/service/auth';
import { useAuthStore } from 'src/stores/authStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $q = useQuasar();
    const state = useAuthStore();
    const router = useRouter();

    const { setAuthIn } = state;

    const form = ref({
      email: '',
      password: '',
    });
    const loading = ref(false);
    const alertError = ref(false);

    async function handleLogin() {
      loading.value = true;
      const result = await login(form.value.email, form.value.password);

      if (result.status == 'success' && result.data) {
        setAuthIn({
          email: result.data.login,
          name: result.data.name,
          id: result.data.id,
        });

        router.push({ name: 'todoIndex' });
      } else {
        alertError.value = true;
      }

      loading.value = false;
    }

    function closeError() {
      alertError.value = false;
    }

    return {
      form,
      $q,
      alertError,
      loading,
      handleLogin,
      closeError,
    };
  },
};
</script>
