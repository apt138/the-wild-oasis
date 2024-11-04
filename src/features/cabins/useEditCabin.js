import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editMutate } = useMutation({
    mutationFn: ({ newCabin, cabinId }) => createOrEditCabin(newCabin, cabinId),
    onSuccess: () => {
      toast.success("Cabin updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editMutate };
}
