import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/apiCabins";
export function useCabin() {
  const {
    isPending,
    data: cabins,
    error,
    status,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  return { isPending, cabins, error, status };
}
