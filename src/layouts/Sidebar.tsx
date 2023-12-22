import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from 'lucide-react';
import { ElementType, ReactNode, useState } from 'react';
import Button, { buttonStyles } from '../components/Button';
import { twMerge } from 'tailwind-merge';
import { Children } from 'react';
import { playlists, subscriptions } from '../data/sidebar';
import { useSidebarContext } from '../contexts/sidebarContext';

function Sidebar() {
  const { isLargeOpen, isSmallOpen } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky overflow-y-auto scrollbar-hidden flex-col pb-4 ml-1 ${
          isLargeOpen ? 'lg:hidden' : 'flex'
        } ${isSmallOpen ? 'flex bg-white max-h-screen' : 'hidden'}`}
      >
        <SmallSidebarItem IconOrImageUrl={Home} title="Home" url="/" />
        <SmallSidebarItem
          IconOrImageUrl={Repeat}
          title="Shorts"
          url="/shorts"
        />
        <SmallSidebarItem
          IconOrImageUrl={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem
          IconOrImageUrl={Library}
          title="Library"
          url="/library"
        />
      </aside>

      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden hidden flex-col pb-4 gap-2 px-2 ${
          isLargeOpen ? 'lg:flex' : 'lg:hidden'
        }`}
      >
        <LargeSidebarSection title={''} visibleItemsCount={2}>
          <LargeSidebarItem
            isActive
            IconOrImageUrl={Home}
            title="Home"
            url="/"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="You" visibleItemsCount={5}>
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Clock}
            title="Watch Later"
            url="/watch-later"
          />
          {playlists.map((list) => (
            <LargeSidebarItem
              isActive={false}
              key={`list-${list.id}`}
              title={list.name}
              IconOrImageUrl={ListVideo}
              url={`/playlist?list=${list.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscribtions" visibleItemsCount={5}>
          {subscriptions.map((sub) => (
            <LargeSidebarItem
              key={`channel-${sub.id}`}
              isActive={false}
              IconOrImageUrl={sub.imgUrl}
              title={sub.channelName}
              url={`/@${sub.channelName}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Music2}
            title="Music"
            url="/music"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Radio}
            title="Live"
            url="/live"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Newspaper}
            title="News"
            url="/news"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            isActive={false}
            IconOrImageUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

type SmallSidebarItemProps = {
  IconOrImageUrl: ElementType | string;
  title: string;
  url: string;
};

function SmallSidebarItem({
  IconOrImageUrl,
  title,
  url,
}: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        'py-4 px-1 flex flex-col items-center rounded-lg gap-1'
      )}
    >
      <IconOrImageUrl className=" h-6 w-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode[];
  title: string;
  visibleItemsCount: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemsCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandedButton = childrenArray.length > visibleItemsCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemsCount);

  const ButtonIconOrImageUrl = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className=" text-lg ml-4 mt-2 mb-1">{title}</div>}
      {visibleChildren}
      {showExpandedButton && (
        <Button
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
          variant="ghost"
          className="w-full flex items-center rounded gap-4 p-3"
        >
          <ButtonIconOrImageUrl className="w-6 h-6" />
          <div>{isExpanded ? 'Show Less' : 'Show More'}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconOrImageUrl: ElementType | string;
  title: string;
  url: string;
  isActive: boolean;
};

function LargeSidebarItem({
  isActive = false,
  IconOrImageUrl,
  title,
  url,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        `w-full flex items-center rounded gap-4 p-3 ${
          isActive ? ' font-bold bg-neutral-100 hover:bg-secondary' : ''
        }`
      )}
    >
      {typeof IconOrImageUrl === 'string' ? (
        <img src={IconOrImageUrl} className=" h-6 w-6 rounded-full" />
      ) : (
        <IconOrImageUrl className=" h-6 w-6" />
      )}
      <div className=" whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}

export default Sidebar;
