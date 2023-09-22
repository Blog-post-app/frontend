import './App.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import CreatePost from './admin/CreatePost';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Layout from './admin/global/Layout'
import EditPost from './admin/EditPost';
import UserDashboard from './user/UserDashboard';
import SinglePost from './pages/SinglePost';
import Navbar from './components/Navbar';
import Hakkimda from './components/Hakkimda';
import CreateHakkimda from './components/CreateHakkimda2';
//HOC
const AdminDashboardHOC = Layout(AdminDashboard);
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);
const UserDashboardHOC = Layout(UserDashboard);

const App = () => {
  return (
    <>
    
      <ToastContainer />
      <Provider store={store}>
       <ProSidebarProvider>
          
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />

              <Route path='/login' element={<LogIn />} />
              <Route path='/register' element={<Register />} />
              <Route path='/post/:id' element={<SinglePost />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/admin/hakkimda' element={<><Navbar></Navbar> <Hakkimda /></>} />

              <Route path='/admin/dashboard' element={<AdminRoute><Navbar/><AdminDashboardHOC /></AdminRoute>} />
              <Route path='/admin/profile' element={<AdminRoute><Navbar/><CreateHakkimda /></AdminRoute>} />

              <Route path='/admin/create-post' element={<AdminRoute><Navbar/><CreatePostHOC /></AdminRoute>} />
              <Route path='/admin/post/edit/:id' element={<AdminRoute><Navbar/><EditPostHOC /></AdminRoute>} />
              <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>

      </Provider>
    </>
  )
}

export default App