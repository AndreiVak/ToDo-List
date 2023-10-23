import React from 'react';

const ContentCheckBox = ({isComplete, handleCompleteTask, id}) => {
    return (
        <div className={`content__circle ${isComplete ? 'active' : ""}`} onClick={() => handleCompleteTask(id)}/>
    );
};

export default ContentCheckBox;