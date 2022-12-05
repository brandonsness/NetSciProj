import Card from "../UI/Card";
import './UserItem.css'

const UserItem = (props) => {

    const onRemoveUser = (event) => {
        props.onRemoveUser(props.id);
    };

    return (
        <li style={{listStyleType: "none"}}>
            <Card className="user-item">
                <h2>SteamId: {props.id}</h2>
                <div className="user-item__description">
                    <button onClick={onRemoveUser}>Remove user</button>
                </div>
            </Card>
        </li>
    )
};

export default UserItem;