import { Header } from "@/components";
import { ListItem } from "@/components";

export default function Home() {
  return (
    <main className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <h1 className="mb-2 text-white text-3xl font-semibold">
          Welcome back!
        </h1>
        <ul
          className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4 
              gap-3 
              mt-4
            "
        >
          <ListItem image="/images/liked.png" name="Liked Songs" href="liked" />
        </ul>
      </Header>
      <section className="mt-2 mb-7 px-6">
        <aside>
          <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
        </aside>
        <aside>
          <p>List of songs</p>
        </aside>
      </section>
    </main>
  );
}
