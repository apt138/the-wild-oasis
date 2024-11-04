import { useQuery } from "@tanstack/react-query";
import { getAllSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    status,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getAllSettings,
  });

  return { isLoading, status, error, settings };
}
