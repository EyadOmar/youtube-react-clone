import PageHeader from './layouts/PageHeader';
import CategoryPills from './components/CategoryPills';
import VideoGridItem from './components/VideoGridItem';
import Sidebar from './layouts/Sidebar';
import { categories, videos } from './data/home';
import { useState } from 'react';
import { SidebarProvider } from './contexts/sidebarContext';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SidebarProvider>
      <div className="main-container max-h-screen flex flex-col ">
        <PageHeader />
        <div className="grid grid-cols-[auto_1fr] flex-grow-1 overflow-auto">
          <Sidebar />
          <main className="px-8 pb-4 overflow-x-hidden">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
              {videos.map((video) => (
                <VideoGridItem {...video} key={video.id} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
