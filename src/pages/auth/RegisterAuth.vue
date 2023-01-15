<template>
  <q-page-container>
    <q-page>
      <div class="row" style="height: 100%">
        <div
          class="col-md-6 gt-sm bg-red-7 q-pa-xl"
          :style="{
            height: $q.screen.lt.md || $q.screen.sm ? '100%' : '100vh',
          }"
        >
          <h2 class="text-h3 text-white">VueDo</h2>
          <p class="text-h5 text-white">
            Join Us And Make Your Scheduling Task Easier
          </p>
        </div>
        <div class="col-md-6 col-12 q-pa-xl">
          <h1 class="text-h3 text-center text-weight-bold">Register</h1>

          <q-form
            @submit="(e) => handleRegister(e)"
            class="q-gutter-md q-mt-xl"
            v-bind:style="
              ($q.screen.md || $q.screen.gt.md) && {
                width: '500px',
                margin: 'auto',
              }
            "
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
              v-model="form.name"
              label="Name"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-input
              type="email"
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

            <q-input
              type="password"
              outlined
              v-model="form.password"
              label="Password"
              lazy-rules
              :rules="[
                (val) => !!val || 'Field is required',
                (val) => val.length >= 6 || 'Minimum password is 6 character',
              ]"
            />

            <div>
              <q-btn
                :loading="loading"
                glossy
                label="Register"
                type="submit"
                color="blue-7"
                style="width: 100%"
              />
            </div>
            <div class="q-mt-md">
              <span> Already have account ? </span>
              <router-link
                to="/login"
                style="text-decoration: none"
                class="text-weight-medium text-blue-7"
                >Login</router-link
              >
            </div>
          </q-form>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { register } from 'src/service/auth';
import { useAuthStore } from 'stores/authStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const store = useAuthStore();
    const { setAuthIn } = store;
    const $q = useQuasar();
    const form = ref({
      email: '',
      password: '',
      name: '',
    });
    const loading = ref(false);
    const alertError = ref(false);

    async function handleRegister(e: Event | SubmitEvent) {
      e.preventDefault();
      loading.value = true;
      const result = await register(
        form.value.email,
        form.value.password,
        form.value.name
      );

      if (result.status == 'success' && result.data.user) {
        setAuthIn({
          email: result.data.email,
          name: result.data.name,
          id: result.data.id,
        });

        router.push({ name: 'todoIndex' });
      } else {
        alertError.value = true;
      }

      loading.value = false;
    }

    async function closeError() {
      alertError.value = false;
    }

    return {
      loading,
      form,
      $q,
      alertError,
      handleRegister,
      closeError,
    };
  },
};
</script>
