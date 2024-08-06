import './styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
/** import components */
import Main from './pages/Main';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { CheckUserExist } from './helper/helper';

/** react routes */
const router = createBrowserRouter([
  {
      path: '/',
      element: <Main></Main>
  },
  {
      path: '/quiz',
      element: <CheckUserExist><Quiz /></CheckUserExist>
  },
  {
      path: '/result',
      element: <CheckUserExist><Result /></CheckUserExist>
  },
])
function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  );
}

export default App;
