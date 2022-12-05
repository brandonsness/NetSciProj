import { useState } from 'react';
import './App.css';
import NewUserForm from './components/NewUser/NewUserForm';
import Users from './components/Users/Users';

function App() {
  const [users, setUsers] = useState([]);

  const addUserHandler = (user) => {
    if(!users.map(e=>e.id).includes(user.id)) {
      setUsers(prevUsers => {return [user, ...prevUsers]});
    }
  };

  const handleSubmit = (event) => {
    if(users.length >= 2) {
      fetch('http://127.0.0.1:5000/users')
      .then(response => response.json())
      .then((data) => console.log(data));

    setUsers([]);
    }
  };

  const onRemoveUser = (id) => {
    setUsers(users.filter(item => item.id !== id))
  }

  return (
    <>
    <NewUserForm onSaveUserData={addUserHandler}/>
    <Users items={users} onRemoveUser={onRemoveUser} />
    <div className='App'>
      <button onClick={handleSubmit}>Submit Users</button>
    </div>
    </>
  );
}

export default App;
