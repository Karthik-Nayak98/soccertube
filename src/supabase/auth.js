import { supabase } from './client';

async function createUserWithEmail(username, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: username,
      },
    },
  });
  return { data, error };
}

async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return { data, error };
}

const logout = async () => {
  return await supabase.auth.signOut();
};

export { createUserWithEmail, logout, signInWithEmail };
