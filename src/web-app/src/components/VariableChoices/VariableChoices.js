import { useState } from "react";
import './VariableChoices.css';

const VariableChoices = (props) => {

    const [useTime, setUseTime] = useState(false);
    const [playedRecent, setPlayedRecent] = useState(false);
    const [threshold, setThreshold] = useState();

    const toggleUseTime = () => {
        setUseTime(!useTime);
        props.toggleUseTime();
    };
    
    const togglePlayedRecent = () => {
        setPlayedRecent(!playedRecent);
        props.togglePlayedRecent();
    };

    const handleThresholdChange = (event) => {
        setThreshold(event.target.value);
        props.handleThresholdChange(event.target.value);
    }

    return (
        <div className="variable-choices">
            <div className="variable-choices__controls">
                <div className="variable-choices__control">
                    <label>Played within the last two weeks?</label>
                    <input type="checkbox" onChange={togglePlayedRecent}/>
                </div>
                <div className="variable-choices__control">
                    <label>Include time played threshold?</label>
                    <input type="checkbox" onChange={toggleUseTime}/>
                </div>
                {
                    useTime &&
                <div className="variable-choices__control">
                    <label>Minimum Hour's played threshold</label>
                    <input type="number" value ={threshold} onBlur={handleThresholdChange}/>
                </div>
                }
            </div>
        </div>
    );
};

export default VariableChoices;