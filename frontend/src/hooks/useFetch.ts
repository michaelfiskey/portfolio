import { useState, useEffect } from 'react';
import { useNotificationContext } from './useNotificationContext';
import { ERRORS } from "../constants/errors";

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawError, setRawError] = useState<string | null>(null);
  const { pushNotification } = useNotificationContext();
  
  const LOAD_DATA_ERROR_MESSAGE = ERRORS.LOAD_DATA;
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      setError(null);
      setRawError(null);
      try {
        const result = await fetcher();
        if (!cancelled) {
          setData(result);
          setIsEmpty(Array.isArray(result) ? result.length === 0 : result === null);
        }
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

  return { data, isLoading, isEmpty, error, rawError };
}