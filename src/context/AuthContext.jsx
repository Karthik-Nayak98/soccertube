/* eslint-disable indent */
import { PropTypes } from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabase/client';

const AuthContext = createContext();

// Create a custom hook for using auth functions.
export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for the current session and updates the user.
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    }
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user;
      setUser(currentUser ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    createUserWithEmail: (username, email, password) =>
      supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: username,
          },
        },
      }),
    loginWithEmail: (email, password) =>
      supabase.auth.signInWithPassword({ email: email, password: password }),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
