import { defineStore } from 'pinia';
import { ref } from 'vue';

interface authData {
  isAuth: boolean;
  userData: userData | null;
}
interface userData {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', () => {
  const authData = ref<authData>({
    isAuth: false,
    userData: null,
  });

  function setAuthIn(userData: userData) {
    authData.value = {
      isAuth: true,
      userData: userData,
    };
  }

  function clearAuth() {
    authData.value = {
      isAuth: false,
      userData: null,
    };
  }

  return { setAuthIn, clearAuth, authData };
});
