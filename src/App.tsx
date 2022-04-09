import { VFC } from 'react';
import './App.css';
import { Header } from './components/Header';
import { TaskCards } from './components/task/TaskCards';

const App: VFC = () => {
  return (
    <div className="app">
      <Header />
      <TaskCards />
    </div>
  );
};

export default App;
