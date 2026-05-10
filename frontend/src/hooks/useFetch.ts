import { useState, useEffect } from 'react';
import { useNotificationContext } from '../context/NotificationContext';

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawError, setRawError] = useState<string | null>(null);
  const { pushNotification } = useNotificationContext();
  
  const LOAD_DATA_ERROR_MESSAGE = "There was an error loading data..."
  
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      setError(null);
      setRawError(null);
      try {
        const result = await fetcher();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          setError(LOAD_DATA_ERROR_MESSAGE);
          setRawError((err as Error).message);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

    useEffect(() => {
        if (rawError) pushNotification("error", rawError);
    }, [rawError]);

  return { data, isLoading, error, rawError };
}