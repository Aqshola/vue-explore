import { supabase } from 'src/library/sb';
import { AuthResponse as AuthResponseVue } from 'src/service/types';

interface AuthData {
  id: string;
  email: string;
  name: string;
}

export async function register(
  email: string,
  password: string,
  name: string
): Promise<AuthResponseVue<AuthData>> {
  try {
    const checkDuplicate = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email);

    if (checkDuplicate.data && checkDuplicate.data.length != 0) {
      return {
        status: 'error',
        msg: 'Email already used',
        data: null,
      };
    }
    const result = await supabase.auth.signUp({
      email,
      password,
    });

    if (!result.error && result.data) {
      await supabase.from('profiles').insert({
        user_id: result.data.user?.id,
        email: email,
        name: name,
      });
    }

    return {
      status: 'success',
      msg: 'register success',
      data: {
        email,
        name,
        id: result.data.user?.id,
      },
    };
  } catch (err) {
    return {
      status: 'error',
      msg: 'register failed',
      data: null,
    };
  }
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponseVue<AuthData>> {
  try {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!result.data && result.error) {
      return {
        status: 'error',
        msg: 'login failed',
        data: null,
      };
    }

    const dataUser = await supabase
      .from('profiles')
      .select()
      .eq('user_id', result.data.user?.id);

    console.log(email, password);

    if (!dataUser.data || dataUser.data.length == 0) {
      return {
        status: 'error',
        msg: 'login failed',
        data: null,
      };
    }

    return {
      status: 'success',
      msg: 'login success',
      data: {
        id: dataUser.data[0].user_id,
        email: dataUser.data[0].email,
        name: dataUser.data[0].name,
      },
    };
  } catch (error) {
    return {
      status: 'error',
      msg: 'login failed',
      data: null,
    };
  }
}

export async function loadUserLoggedIn(): Promise<AuthResponseVue<AuthData>> {
  const loggedId = await supabase.auth.getUser();

  if (!loggedId.data) {
    return {
      status: 'error',
      msg: 'User not found',
      data: null,
    };
  }
  const result = await supabase
    .from('profiles')
    .select()
    .eq('user_id', loggedId.data.user?.id);

  if (!result.data || result.data.length < 0) {
    return {
      status: 'error',
      msg: 'User not found',
      data: null,
    };
  }

  return {
    status: 'success',
    msg: 'User found',
    data: {
      email: result.data[0].email,
      name: result.data[0].name,
      id: result.data[0].user_id,
    },
  };
}

export async function logout() {
  await supabase.auth.signOut();
}
