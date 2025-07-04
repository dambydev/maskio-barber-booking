import { supabase } from "./src/lib/supabase.js";

async function checkBarbersRaw() {
  try {
    const { data, error } = await supabase
      .from("barbers")
      .select("*")
      .order("id");

    if (error) {
      console.error("Error fetching barbers:", error);
      return;
    }

    console.log("Raw barbers data:");
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

checkBarbersRaw();
