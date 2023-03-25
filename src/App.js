import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes
} from 'react-router-dom';
import { Sidebar } from './components';
import { Dashboard, Login } from './pages';
import { isLogin } from './utils/utils';

console.log(isLogin());
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  }
]);

function App() {
  return (
    <>
      {isLogin() ?
      <div className='container-fluid'>
        <div  className='row flex-nowrap'>
          <Sidebar />
          <main  style={{height:'100%'}} className='col ps-md-2 pt-2'>
            <a
              href='#'
              data-bs-target='#sidebar'
              data-bs-toggle='collapse'
              className='border rounded-3 p-1 text-decoration-none'
            >
              <i className='bi bi-list bi-lg py-2 p-1'></i> Menu
            </a>
            <Routes>
              <Route path='/' element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
      :
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>}
    </>
  );
}

export default App;
