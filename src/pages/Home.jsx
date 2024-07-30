import { useContext } from "react";
import { SessionContext } from "../SessionProvider";
import { Navigate } from "react-router-dom";

function Home() {
  // useContextの戻り値はオブジェクトなので、正しくデストラクチャします。
  const { currentUser } = useContext(SessionContext);

  if (currentUser == null) return <Navigate to="/signin" replace />;

  return <div>this is home</div>;
}

export default Home;
