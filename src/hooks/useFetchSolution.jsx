import { useState, useEffect, useCallback } from "react";
import { useAsyncList } from "react-stately";

export default function useFetchSolution(initialUrl) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [url, updateUrl] = useState(initialUrl);

  let games = useAsyncList({
    async load({ signal, cursor }) {
      let res = await fetch(
        cursor || url,
        {
          signal,
        }
      );
      let json = await res.json();
      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const load = useCallback(async () => {
    setData(null);
    if (!url) {
      setError("Error URL");
      return;
    } else {
      setError(null);
    }
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
    setLoading(false);
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    url,
    loading,
    error,
    data,
    load,
    updateUrl,
    games
  };
}