import React from 'react';

const ContentCheckBox = ({isComplete, handleCompleteTask, id, statusContent}) => {
    return (
        <div className={`content__circle ${isComplete ? 'active' : ""}`} onClick={() => handleCompleteTask(id, statusContent)}/>
    );
};

export default ContentCheckBox;