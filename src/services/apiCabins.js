import { randomInt } from "../utils/helpers";
import supabase from "./supabase";

export async function getAllCabins() {
  const { data, error } = await supabase.from("wo_cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be loaded!");
  }
  return data;
}

export async function deleteCabinById(cabinId) {
  const { error } = await supabase
    .from("wo_cabins")
    .delete()
    .eq("cabin_id", cabinId);
  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be deleted!");
  }
  return null;
}

export async function createOrEditCabin(newCabin, cabinId) {
  // https://lwdjponhgyoyydadkpag.supabase.co/storage/v1/object/public/wo_cabin_images/cabin-001.jpg
  // https://lwdjponhgyoyydadkpag.supabase.co/storage/v1/object/wo_cabin_images/1730560080861-cabin-008.jpg
  console.log(newCabin, cabinId);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  // checking whether user editing the image
  const hasImagePath =
    typeof newCabin.image_url === "string" &&
    newCabin.image_url.startsWith(supabaseUrl);
  const supabaseStoragePath = import.meta.env
    .VITE_SUPABASE_STORAGE_RELATIVE_PATH;
  const imageName = `${Date.now()}-${newCabin.image_url.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image_url
    : `${supabaseUrl}${supabaseStoragePath}${imageName}`;
  // 1. Create / Edit a New Cabin
  let query = supabase.from("wo_cabins");

  // 1. (A) Create
  if (!cabinId) query = query.insert([{ ...newCabin, image_url: imagePath }]);

  // 1. (B) Edit
  if (cabinId)
    query = query
      .update({
        ...newCabin,
        image_url: imagePath,
        updated_at: new Date().toISOString(),
      })
      .eq("cabin_id", cabinId);

  const { data, error } = await query.select();
  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be created!");
  }

  // 2. Uploading cabin image to bucket
  if (!hasImagePath) {
    const { error: storagError } = await supabase.storage
      .from("wo_cabin_images")
      .upload(imageName, newCabin.image_url);

    // 3. Delete newly created cabin if uploading image was unsuccessful.
    if (storagError) {
      console.log(data);
      await supabase
        .from("wo_cabins")
        .delete()
        .eq("cabin_id", data[0].cabin_id);
      console.error(storagError);
      throw new Error(
        "Cabins couldn't be uploaded!. newly created cabin was deleted successfully."
      );
    }
  }
  return data;
}
