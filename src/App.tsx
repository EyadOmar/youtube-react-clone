import PageHeader from './layouts/PageHeader';

function App() {
  return (
    <div className="main-container max-h-screen flex flex-col ">
      <PageHeader />
      <div className="content flex">
        <aside>2</aside>
        <main>3</main>
      </div>
    </div>
  );
}

export default App;
