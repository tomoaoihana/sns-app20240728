import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../SessionProvider";
import { Navigate } from "react-router-dom";
import { SideMenu } from "../components/SideMenu";
import { postRepository } from "../repositories/post";
import { Post } from "../components/post";
import { Pagination } from "../components/Pagenation";

const limit = 5;

function Home() {
  // useContextの戻り値はオブジェクトなので、正しくデストラクチャします。
  const { currentUser } = useContext(SessionContext);
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    const post = await postRepository.create(content, currentUser.id);
    // console.log("投稿したデータ:", post);
    //リアルタイムで更新できるように変更
    //postの中にはpostのみで、post_viewの情報は含まれていないので、
    //ここで追加でuserNameを追加する処理が必要

    setPosts([
      {
        ...post,
        userId: currentUser.id,
        userName: currentUser.userName,
      },
      ...posts,
    ]);
    setContent("");
  };

  const fetchPosts = async (page) => {
    const posts = await postRepository.find(page, limit);
    setPosts(posts);
  };

  const moveToNext = async () => {
    const nextPage = page + 1;
    await fetchPosts(nextPage);
    setPage(nextPage);
  };

  const moveToPrev = async () => {
    const prevPage = page - 1;
    await fetchPosts(prevPage);
    setPage(prevPage);
  };

  if (currentUser == null) return <Navigate to="/signin" replace />;

  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-[#34D399] p-4">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">SNS APP</h1>
            <button className="text-white hover:text-red-600">
              ログアウト
            </button>
          </div>
        </header>
        <div className="container mx-auto mt-6 p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <textarea
                  className="w-full p-2 mb-4 border-2 border-gray-200 rounded-md"
                  placeholder="What's on your mind?"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
                <button
                  onClick={createPost}
                  disabled={content === ""}
                  className="bg-[#34D399] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
              <div className="mt-4">
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
              <Pagination
                onPrev={page > 1 ? moveToPrev : null}
                onNext={posts.length >= limit ? moveToNext : null}
                page={page}
              />
            </div>
            <SideMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
