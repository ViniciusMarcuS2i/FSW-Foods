import { Header } from "./_components/header";
import { Search } from "./_components/search";
import { Input } from "./_components/ui/input";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
    </>
  );
}
