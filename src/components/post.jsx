import { useContext } from "react";
import { SessionContext } from "../SessionProvider";

export function Post(props) {
  const { currentUser } = useContext(SessionContext);
  console.log(currentUser.id);

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">By:{props.post.userName}</h3>
      <p className="text-gray-700">{props.post.content}</p>

      {currentUser.id === props.post.userId && (
        <button className="text-blue-500 hover:underline cursor-pointer focus:outline-none">
          削除
        </button>
      )}
    </div>
  );
}
