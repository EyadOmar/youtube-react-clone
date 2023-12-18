import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { useEffect, useRef, useState } from 'react';
const TRANSLATE_VALUE = 200;

type CategoryPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) {
  const [translate, setTranslate] = useState(0);
  const catsContainer = useRef<HTMLDivElement>(null);

  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  useEffect(() => {
    if (catsContainer.current == null) return;
    const visibleWidth = catsContainer.current.clientWidth;
    const fullWidth = catsContainer.current.scrollWidth;
    setIsLeftVisible(translate > 0);
    setIsRightVisible(visibleWidth + translate < fullWidth);
  }, [categories, translate]);

  return (
    <div ref={catsContainer} className="overflow-x-hidden relative">
      <div
        className={`flex whitespace-nowrap gap-3 transition-transform w-[max-content]`}
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((cat) => (
          <Button
            variant={`${selectedCategory === cat ? 'dark' : 'default'}`}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            key={`${cat}-pill`}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="h-full aspect-square w-auto p-1.5"
            onClick={() =>
              setTranslate(() => {
                const newTranslate = translate - TRANSLATE_VALUE;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              })
            }
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="h-full aspect-square w-auto p-1.5"
            onClick={() =>
              setTranslate(() => {
                if (catsContainer.current == null) return translate;
                const visibleWidth = catsContainer.current.clientWidth;
                const fullWidth = catsContainer.current.scrollWidth;
                const newTranslate = translate + TRANSLATE_VALUE;
                if (newTranslate + visibleWidth >= fullWidth)
                  return fullWidth - visibleWidth;
                return newTranslate;
              })
            }
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default CategoryPills;
