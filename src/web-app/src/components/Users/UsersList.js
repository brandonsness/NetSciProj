import UserItem from "./UserItem";

const UsersList = (props) => {

    return(
        <ul className="users-list">
            {props.items.map((user) => (
                <UserItem 
                key={user.id}
                id={user.id}
                onRemoveUser={props.onRemoveUser}
                />
            ))}
        </ul>
    );
};

export default UsersList;