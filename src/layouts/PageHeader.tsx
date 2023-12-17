import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react';
import Button from '../components/Button';
import { useState } from 'react';

function PageHeader() {
  const [showFullSearch, setShowFullSearch] = useState(false);
  return (
    <header className="flex gap-10 lg:gap-20 justify-between items-center p-4">
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          showFullSearch ? 'hidden' : 'flex'
        }`}
      >
        <Button className="aside-switch" variant={'ghost'} size={'icon'}>
          <Menu />
        </Button>
        <a href="/" className="text-primary ">
          LOGO
        </a>
      </div>
      <form
        className={`gap-4 flex-grow justify-center items-center ${
          showFullSearch ? 'flex' : 'hidden md:flex'
        }`}
      >
        {showFullSearch && (
          <Button
            onClick={() => {
              setShowFullSearch(false);
            }}
            className="flex-shrink-0"
            type="button"
            variant={'ghost'}
            size={'icon'}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="search flex flex-grow max-w-[600px] justify-center">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-primary outline-none"
          />
          <Button className="rounded-r-full py-2 px-4 border border-secondary-border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size={'icon'} className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={` flex-shrink-0 md:gap-2 ${
          showFullSearch ? 'hidden' : 'flex'
        }`}
      >
        <Button
          onClick={() => {
            setShowFullSearch(true);
          }}
          className="md:hidden"
          variant={'ghost'}
          size={'icon'}
        >
          <Search />
        </Button>
        <Button className="md:hidden" variant={'ghost'} size={'icon'}>
          <Mic />
        </Button>
        <Button variant={'ghost'} size={'icon'}>
          <Upload />
        </Button>
        <Button variant={'ghost'} size={'icon'}>
          <Bell />
        </Button>
        <Button variant={'ghost'} size={'icon'}>
          <User />
        </Button>
      </div>
    </header>
  );
}

export default PageHeader;
