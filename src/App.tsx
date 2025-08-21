import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from 'sonner';
import TodoApp from './components/TodoApp';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="todo-theme">
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<TodoApp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
