import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editSetting } from "../../services/apiSettings";

export function useEditSetting() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editMutate } = useMutation({
    mutationFn: editSetting,
    onSuccess: () => {
      toast.success("Settings updated sucessfully!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editMutate };
}
