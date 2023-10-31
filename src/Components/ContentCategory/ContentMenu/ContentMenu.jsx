import React, {useContext} from 'react';
import ContentCheckBox from "../ContentCheckBox";
import {AiOutlineClose} from "react-icons/ai";
import {CustomContext} from "../../../utils/Context";

const ContentMenu = ({statusContent}) => {

    const {user, handleCompleteTask, delTask} = useContext(CustomContext)

    return (

            <ul className='content__menu'>
                {
                    statusContent !== 'all' ?
                        user.categories.find((item) => item.categoryName === statusContent).tasks.map((item) => (
                            <li className='content__item' key={item.id}>
                                <ContentCheckBox statusContent={statusContent} isComplete={item.isComplete} handleCompleteTask={handleCompleteTask} id={item.id}/>
                                {item.taskTitle}
                                <span className='content__item-del' onClick={() => delTask(item.id, statusContent)}><AiOutlineClose/></span>
                            </li>
                        )) : ''
                }
            </ul>
    );
};

export default ContentMenu;