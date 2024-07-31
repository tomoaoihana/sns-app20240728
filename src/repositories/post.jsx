import { supaBase } from "../lib/supaBase";

export const postRepository = {
  async create(content, userId) {
    const { data, error } = await supaBase
      .from("posts")
      .insert([{ content, user_id: userId }])
      .select();

    if (error != null) throw new Error(error.message);

    return data[0];
  },
};
