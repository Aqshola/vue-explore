<template>
  <q-page-container>
    <q-page>
      <div class="row" style="height: 100vh">
        <div class="col-md-6 gt-sm bg-red-7 q-pa-xl" style="height: 100%">
          <h2 class="text-h3 text-white">VueDo</h2>
          <p class="text-h5 text-white">
            Join Us And Make Your Scheduling Task Easier
          </p>
        </div>
        <div class="col-md-6 col-12 q-pa-xl">
          <h1 class="text-h3 text-center text-weight-bold">Register</h1>
          <q-form
            class="q-gutter-md q-mt-xl"
            v-bind:style="
              ($q.screen.md || $q.screen.gt.md) && {
                width: '500px',
                margin: 'auto',
              }
            "
          >
            <q-input outlined v-model="name" label="Name" lazy-rules />
            <q-input
              type="email"
              outlined
              v-model="email"
              label="Email"
              lazy-rules
            />

            <q-input
              type="password"
              outlined
              v-model="password"
              label="Password"
              lazy-rules
            />

            <div>
              <q-btn
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
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    const email = '';
    const password = '';
    const name = '';
    return {
      email,
      password,
      name,
      $q,
    };
  },
};
</script>
