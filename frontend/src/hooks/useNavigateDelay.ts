import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useNavigateDelay = (route: string, delay: number = 5000) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(route);
    }, delay);

    return () => clearTimeout(timer);
  }, [route, delay, navigate]);
};
