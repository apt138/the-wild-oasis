import supabase from "./supabase";

export async function getAllSettings() {
  const { data, error } = await supabase
    .from("wo_settings")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Error while fetching the settings from remote server.");
  }

  return data;
}

export async function editSetting(newSetting) {
  // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
  const { data, error } = await supabase
    .from("wo_settings")
    .update({ ...newSetting, updated_at: new Date().toISOString() })
    .eq("setting_id", 1)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error while updating the setting.");
  }

  return data;
}
