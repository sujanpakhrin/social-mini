import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  const userColors = {
    "Sujan Pakhrin": "#FF6B6B",
    Sakura: "#4ECDC4",
    Charlie: "#FFD93D",
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();

    const url = `http://localhost:3000/api/posts/create`;
    const body = { text };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });
      const newPost = await response.json();

      if (!response.ok) {
        throw new Error(newPost.message || "Failed to create post");
      }

      setPosts([newPost, ...posts]);
      setText("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <div className="bg-slate-900 min-h-screen">
        {/*header*/}
        <div className="flex flex-row justify-between items-center p-3 px-10 bg-slate-900 text-white font-bold text-3xl">
          {" "}
          social-mini
          <button className="border-2 rounded px-2 py-1 text-white  font-medium text-sm cursor-pointer">
            Log out
          </button>
        </div>

        {/*body*/}
        <div className=" flex justify-between p-5">
          {/*Sidebar*/}
          <div className=" w-40 flex flex-col items-start p-5 gap-3">
            <div className="text-white px-2 py-1 rounded-2xl cursor-pointer">
              news
            </div>
            <div className="text-white px-2 py-1 rounded-2xl cursor-pointer">
              friends
            </div>
          </div>

          {/*Posts*/}
          <div className="flex flex-col bg-slate-900 w-210 items-center rounded-3xl p-5 gap-5">
            <div className="bg-slate-800 h-50 w-180 rounded-3xl flex flex-col justify-between gap-1 p-3  backdrop-blur-lg border border-white/20 ">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="text-white h-40 p-3 bg-slate-800w-full rounded-3xl rounded-bl-none rounded-br-none text-left placeholder-white outline-none focus:outline-none focus:ring-0 focus:border-none border-none text-sm transition duration-200"
                placeholder="What's on your mind?"
              />
              <div className="flex flex-row gap-5 mt-3 ml-4">
                <button className="bg-white px-2 py-1 rounded-2xl text-sm cursor-pointer">
                  add image
                </button>
                <button className="bg-white px-2 py-1 rounded-2xl text-sm cursor-pointer">
                  add stickers
                </button>
                <button className="bg-white px-2 py-1 rounded-2xl text-sm cursor-pointer">
                  add file
                </button>
              </div>
              <div></div>
              <button
                onClick={handlePost}
                className="bg-blue-500 text-white text-sm p-2 rounded-2xl cursor-pointer mt--3"
              >
                Post
              </button>
            </div>
            {/*Posts Lisst*/}
            <div className=" w-full mx-auto mt-6 space-y-4">
              {posts.length === 0 ? (
                <div className=" p-4 rounded-xl  flex justify-center items-center h-50">
                  <p className="text-slate-200 text-center">
                    There are no posts...
                  </p>
                </div>
              ) : (
                posts.map((post) => {
                  const userName = post.userId.name;
                  const color = userColors[userName] || "#888888";
                  return (
                    <div
                      key={post._id}
                      className="bg-slate-800 p-4 rounded-xl border border-slate-700"
                    >
                      <p style={{ color }} className="font-bold text-lg mb-2">
                        {userName}
                      </p>
                      <p className="text-slate-200">{post.text}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/*Online users*/}
          <div className="mt- h-70 w-40 ml-10  px-2 py-1 rounded-2xl">
            <div className="flex w-25 justify-center text-white font-bold text-2xl rounded-2xl">
              Friends
            </div>
            <div className="flex flex-col items-center  gap-2 p-2 rounded-2xl mt-3">
              <div className="text-white  p-2 rounded-2xl cursor-pointer">
                Kenny
              </div>
              <div className="text-white  p-2 rounded-2xl cursor-pointer">
                Simu
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
