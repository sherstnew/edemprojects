import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CreateProjectPage } from './pages/CreateProjectPage';
import { PlayersPage } from './pages/PlayersPage';
import { PlayerPage } from './pages/PlayerPage';
import { RegistryPage } from './pages/RegistryPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/new' element={<CreateProjectPage />} />
        <Route path='/players' element={<PlayersPage />} />
        <Route path='/player' element={<PlayerPage />} />
        <Route path='/registry' element={<RegistryPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
