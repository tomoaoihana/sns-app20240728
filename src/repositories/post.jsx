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

  async find(page, limit) {
    //Pagenationを実装するために、pageとlimitを引数に追加
    //pageとlimitはデフォルト値を設定しておく
    //pageは1から始まるため、初期値は1
    //limitは1ページあたりの表示件数を指定するため、初期値は10
    page = isNaN(page) || page < 1 ? 1 : page;
    //pageが数値でないか、1未満の場合は1にする
    //もしページが0だったら、startは0になるため、0から始まる
    const start = limit * (page - 1);
    const end = start + limit - 1;

    const { data, error } = await supaBase
      .from("posts_view")
      .select("*")
      .range(start, end)
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
  async delete(id) {
    const { error } = await supaBase.from("posts").delete().eq("id", id);
    if (error != null) throw new Error(error.message);
    return true;
  },
};
