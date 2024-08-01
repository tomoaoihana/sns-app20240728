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

  async find() {
    const { data, error } = await supaBase
      .from("posts_view")
      .select("*")
      .order("created_at", { ascending: false });

    if (error != null) throw new Error(error.message);

    return data.map((post) => {
      return {
        ...post,
        userId: post.user_id,
        userName: post.user_metadata.name,
      };
    });
  },
};
