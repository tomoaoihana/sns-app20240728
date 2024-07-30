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
    try {
      if (!data || !data.user) {
        const errorMsg =
          "ユーザー情報を正しく取得できませんでした。再試行してください。";
        alert(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      // エラーが発生した場合にここで処理される
      console.error("SignIn Error:", error);
      // 必要に応じて、ここでさらにエラーハンドリングを行う
      // 例: エラーログを外部サービスに送信するなど
    }

    return { ...data.user, userName: data.user.user_metadata.name };
  },
  async getCurrentUser() {
    const { data, error } = await supaBase.auth.getSession();
    if (error != null) throw new Error(error.message);
    if (data.session == null) return;

    return {
      ...data.session.user,
      userName: data.session.user.user_metadata.name,
    };
  },
};

// omochi0107
//44.supabaseはJWTトークンをローカルストレージに保存している(メアドとパスワードを使ってサインインした場合)
//Sessionに保存されているJWTトークンを取得する
//JWTトークンの有効期限は１時間で設定されている
//getSessionはログインするたびに新しいJWTトークンを取得する
