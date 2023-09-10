import './App.css'
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials=true;

function App() {
  

  return (
   <UserContextProvider>
     <Navbar/>
     <Toaster position="bottom right" toastOptions={{duration: 3000}}/>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
     </Routes>
     </UserContextProvider>
  )
}

export default App
