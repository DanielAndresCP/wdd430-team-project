import SearchBar from "./searchBar";
import NavBar from "./navBar";

export default function Header() {
  return (
    <header className="bg-green-medium text-white">
      <div className="p-6 mx-auto container flex flex-col sm:flex-row gap-6 items-center">
        <div className="p-2 aspect-video bg-white text-black text-3xl">
          Logo
        </div>

        <SearchBar className="grow w-full sm:w-auto max-w-md" />
      </div>
      <div className="bg-green-desaturated-light text-black">
        <div className="container mx-auto p-4 sm:p-6">
          <NavBar />
        </div>
      </div>
    </header>
  );
}
