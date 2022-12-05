import "./NewUserForm.css"
import {useState} from "react";


const ExpenseForm = (props) => {
    const [enteredId, setEnteredId] = useState("");

    const idChangeHandler = (event) => {
        setEnteredId(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if(enteredId !== '') {
            const userData = {
                id: enteredId
            };

            //Pass data up
            props.onSaveUserData(userData);

            setEnteredId('');
        }
    };

    return (
        <div className="new-user">
            <form onSubmit={submitHandler}>
                <div className="new-user__controls">
                    <div className="new-user__control">
                        <label>Please enter a user's SteamId</label>
                        <input type="text" value={enteredId} onChange={idChangeHandler}/>
                    </div>
                </div>

                <div className="new-user__actions">
                    <button type="submit">Add User</button>
                </div>
            </form>
        </div>
    );

};

export default ExpenseForm;