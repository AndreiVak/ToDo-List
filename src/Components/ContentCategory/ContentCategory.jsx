import React, {useContext} from 'react';
import {BsPencil} from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai"
import {CustomContext} from "../../utils/Context";
import ContentCheckBox from "./ContentCheckBox";

const ContentCategory = ({status}) => {

    const {user} = useContext(CustomContext)

    return (
        <>
            <div className='content__top'>
                <h2 className='content__title'> {status} </h2>
                <span className='content__edit'><BsPencil/></span>
            </div>

            <ul className='content__menu'>
                {
                    status !== 'all' ?
                        user.categories.find((item) => item.categoryName === status).tasks.map((item) => (
                            <li className='content__item' key={item.id}>
                                <ContentCheckBox isComplete={item.isComplete}/>
                                {item.taskTitle}
                            </li>
                        )) : ''
                }
            </ul>
            <div className="content__bottom">
                <AiOutlinePlus className='content__bottom-icon'/>
                <p className="content__bottom-text">Новая задача</p>
            </div>
        </>
    );
};

export default ContentCategory;