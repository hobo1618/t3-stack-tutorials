import { useState } from "react";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { createNextApiHandler } from "@trpc/server/adapters/next";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const ctx = trpc.useContext();
  const postMessage = trpc.useMutation("guestbook.postMessage", {
    onMutate: () => {
      ctx.cancelQuery(["guestbook.getAll"])

      let optimisticUpdate = ctx.getQueryData(["guestbook.getAll"])
      if(optimisticUpdate) {
        ctx.setQueryData(["guestbook.getAll"], optimisticUpdate)
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["guestbook.getAll"])
    }
  });

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="pt-4 text-3xl">Guestbook</h1>
      <p>
        Tutorial for <code>create-t3-app</code>
      </p>

      <div className="pt-10">
        {session ? (
          <div>
            <p>hi {session.user?.name}</p>

            <button onClick={() => signOut()}>Logout</button>

            <div className="pt-6">
              <form
                className="flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();

                  postMessage.mutate({
                    name: session.user?.name as string,
                    message,
                  });

                  setMessage("");
                }}
              >
                <input
                  type="text"
                  value={message}
                  placeholder="Your message..."
                  maxLength={100}
                  onChange={(event) => setMessage(event.target.value)}
                  className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className="pt-10">
              <Messages />
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => signIn("discord")}>
              Login with Discord
            </button>

            <div className="pt-10" />
            <Messages />
          </div>
        )}
      </div>
    </main>
  );
};

const Messages = () => {
  const { data: messages, isLoading } = trpc.useQuery(["guestbook.getAll"]);

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4">
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Home;