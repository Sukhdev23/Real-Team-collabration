import { Routes, Route } from 'react-router-dom';
import AuthForm from './pages/AuthForm';
import AllWorkspaces from './pages/workshop/ProfileWorkspaces';
import MainLayout from './pages/workshop/MainLayout';
import BoardPage from './pages/workshop/BoardPage';
import WorkspaceLayout from './pages/workshop/Workspacelayout';

const App = () => (
  <Routes>
    <Route path="/login/register" element={<AuthForm />} />
    <Route path="/workspaces" element={<AllWorkspaces />} />

  <Route path="/workshop/:workspaceId" element={<MainLayout />}>
    <Route element={<WorkspaceLayout />}>
      <Route index element={<p>Select a board from sidebar</p>} />
      <Route path="board/:boardId" element={<BoardPage />} />
    </Route>
  </Route>

    <Route path="*" element={<div className="p-10 text-2xl">404 Not Found</div>} />
  </Routes>
);
export default App;
