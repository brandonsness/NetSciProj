import Card from "../UI/Card";
import "./Users.css"
import UsersList from "./UsersList";

const Users = (props) => {

    return(
        <Card className="users">
            <UsersList items={props.items} onRemoveUser={props.onRemoveUser}/>
        </Card>
    );
};

export default Users;