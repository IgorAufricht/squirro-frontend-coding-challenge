import BookStoreList from './components/BookStoreList';
import Flash from './components/Flash';

import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Squirro Frontend Coding Challenge</h1>
      </header>
      <section className="content">
        <BookStoreList />
      </section>
      <Flash />
    </div>
  );
}

export default App;
