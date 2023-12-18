import PageHeader from './layouts/PageHeader';
import CategoryPills from './components/CategoryPills';
import { categories } from './data/home';
import { useState } from 'react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="main-container max-h-screen flex flex-col ">
      <PageHeader />
      <div className="grid grid-cols-[auto_1fr] flex-grow-1 overflow-auto">
        <aside>Sidebar</aside>
        <main className="px-8 pb-4 overflow-x-hidden">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
