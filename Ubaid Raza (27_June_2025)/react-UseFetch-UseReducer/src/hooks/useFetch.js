import { useState, useEffect } from 'react';

/**
 * useFetch - Reusable data‑fetching hook
 *
 * @param {string} url - endpoint to fetch
 * @returns {object} { data, loading, error }
 */
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let ignore = false;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((json) => {
        if (!ignore) {
          setData(json);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => (ignore = true);
  }, [url]);

  return { data, loading, error };
}
