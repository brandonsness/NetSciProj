import { useState } from 'react';
import './App.css';
import NewUserForm from './components/NewUser/NewUserForm';
import Users from './components/Users/Users';
import VariableChoices from './components/VariableChoices/VariableChoices';

function App() {
  const [users, setUsers] = useState([]);
  const [useTime, setUseTime] = useState(false);
  const [playedRecent, setPlayedRecent] = useState(false);
  const [threshold, setThreshold] = useState(0);

  const addUserHandler = (user) => {
    if(!users.map(e=>e.id).includes(user.id)) {
      setUsers(prevUsers => {return [user, ...prevUsers]});
    }
  };

  const handleSubmit = (event) => {
    if(users.length >= 2) {
      var userList = users.map(e=>e.id)

      var requestJson = {"users": userList, "useTime": useTime, "playedRecent": playedRecent, "threshold": threshold};
      console.log(JSON.stringify(requestJson))

      fetch('http://localhost:5000/data', {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'applications/json'
        },
        body: JSON.stringify(requestJson)
      });

    setUsers([]);
    }
  };

  const onRemoveUser = (id) => {
    setUsers(users.filter(item => item.id !== id))
  }

  const toggleUseTime = () => {
    setUseTime(!useTime);
  };
  
  const togglePlayedRecent = () => {
    setPlayedRecent(!playedRecent);
  };

  const handleThresholdChange = (value) => {
    setThreshold(value);
  };

  return (
    <>
    <NewUserForm onSaveUserData={addUserHandler}/>
    <VariableChoices
     toggleUseTime={toggleUseTime}
     togglePlayedRecent={togglePlayedRecent}
     handleThresholdChange={handleThresholdChange}
    />
    <Users items={users} onRemoveUser={onRemoveUser} />
    <div className='App'>
      <button onClick={handleSubmit}>Submit Users</button>
    </div>
    </>
  );
}

export default App;
