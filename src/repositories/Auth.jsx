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
    if (error != null) throw new Error("error.message");

    return { ...data.user, userName: data.user.user_metadata.name };
  },
};
