import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './searchBar';
import NavBar from './navBar';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className="bg-green-medium text-white">
      <div className="p-6 mx-auto container flex flex-col sm:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-6 w-full sm:w-auto">
          <Link href="/" className="bg-white p-2 rounded">
            <Image
              src="/logo/logo.png"
              alt="Logo"
              width={100}
              height={40}
              className="h-auto w-auto object-contain"
              priority
            />
          </Link>
          <SearchBar className="grow w-full sm:w-auto max-w-md" />
        </div>
        <UserMenu />
      </div>

      <div className="bg-green-desaturated-light text-black">
        <div className="container mx-auto p-4 sm:p-6">
          <NavBar />
        </div>
      </div>
    </header>
  );
}
