import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PlayersPage } from './pages/PlayersPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CreateProjectPage } from './pages/CreateProjectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/new' element={<CreateProjectPage />} />
        <Route path='/players' element={<PlayersPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
