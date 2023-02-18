import './App.css';
import { Routes, Route } from 'react-router-dom';
import UpdateUser from './components/UpdateUser';
import UserList from './components/UserList';
import SingleUser from './components/SingleUser';
import NewUser from './components/NewUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserList />}></Route>
        <Route path="/single-user/:id" element={<SingleUser />}></Route>
        <Route path="/add-new-user" element={<NewUser />}></Route>
        <Route path="/update-user/:id" element={<UpdateUser />}></Route>
      </Routes>
    </div>
  );
}

export default App;
