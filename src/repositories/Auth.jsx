import { supaBase } from "../lib/supaBase";

//APIを叩く処理を書く
//singUpメソッドを作成
export const authRepository = {
  async signup(name, email, password) {
    const { data, error } = await supaBase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error != null) throw new Error(error.message);

    return { ...data.user, userName: data.user.user_metadata.name };
  },

  async signin(email, password) {
    const { data, error } = await supaBase.auth.signInWithPassword({
      email,
      password,
    });
    // if (error) throw new Error(error.message);
    if (error) {
      alert(`サインイン時にエラーが発生しました: ${error.message}`);
      throw new Error(error.message);
    }

    // レスポンスの中身を確認
    console.log("APIレスポンス:", data);

    // data または data.user が未定義でないことを確認
    if (!data || !data.user) {
      const errorMsg =
        "ユーザー情報を正しく取得できませんでした。再試行してください。";
      alert(errorMsg);
      throw new Error(errorMsg);
    }

    return { ...data.user, userName: data.user.user_metadata.name };
  },
};

// omochi0107
