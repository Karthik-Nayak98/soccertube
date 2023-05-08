/* eslint-disable indent */

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabase/client';

function useFetch(table) {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    async function getSupabaseData() {
      const { data, error } = await supabase
        .from(table)
        .select()
        .eq('user_id', user?.id)
        .order('id', { ascending: false });

      if (error) {
        switch (error.code) {
          case '42P01':
            setError(`Table ${table} does not exist in database.`);
            break;
          default:
            console.log(error.code);
            setError('Unable to fetch the data from the database');
            break;
        }
        setData(null);
      }
      if (data) {
        setData(data);
        setError(null);
      }
    }
    getSupabaseData();
    setLoading(false);
  }, []);

  return { isLoading: loading, data: data ?? [], error: error };
}

export default useFetch;
