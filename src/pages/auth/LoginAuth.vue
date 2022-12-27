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
            class="q-gutter-md q-mt-xl"
            v-bind:style="{
              width: $q.screen.md || ($q.screen.gt.md && '500px'),
              margin: $q.screen.md || ($q.screen.gt.md && 'auto'),
            }"
          >
            <q-input outlined v-model="email" label="Email" lazy-rules />

            <div>
              <q-input
                type="password"
                outlined
                v-model="password"
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

export default {
  setup() {
    const $q = useQuasar();
    const email = '';
    const password = '';
    return {
      email,
      password,
      $q,
    };
  },
};
</script>
