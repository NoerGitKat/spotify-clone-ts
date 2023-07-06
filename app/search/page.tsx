import { getSongsByTitle } from "@/actions/songs";
import { Header, SongList } from "@/components";
import { SearchInput } from "@/components/search";

export const revalidate = 0;

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export default async function Search({
  searchParams
}: SearchProps): Promise<JSX.Element> {
  const searchedSongs = await getSongsByTitle(searchParams.title);

  return (
    <main className="bg-neutral-900 rounded-lg h-full w-full overflow-hdden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <h1 className="text-white text-3xl font-semibold">Search</h1>
        <SearchInput />
      </Header>
      <SongList songs={searchedSongs} isRow hasLikeButton />
    </main>
  );
}
