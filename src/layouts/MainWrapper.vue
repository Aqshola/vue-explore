<template>
  <q-layout
    container
    view="hhh ppp fff"
    style="min-height: 100vh"
    class="q-pa-md"
  >
    <q-header reveal class="bg-red-7">
      <q-toolbar>
        <q-icon name="check_circle" size="30px" color="white" />

        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration: none">
            Vue Todo
          </router-link>
        </q-toolbar-title>

        <q-btn to="/login" flat label="Login" />
        <q-btn to="/register" flat label="Register" />
      </q-toolbar>
    </q-header>
    <router-view></router-view>
  </q-layout>
</template>
