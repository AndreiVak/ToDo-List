import React, {useContext} from 'react';
import {BsPencil} from "react-icons/bs";
import {CustomContext} from "../../utils/Context";

const ContentCategory = ({status}) => {

    const {user} = useContext(CustomContext)

    return (
        <>
            <div className='content__top'>
                <h2 className='content__title'> {status} </h2>
                <span className='content__edit'><BsPencil/></span>
            </div>

            <ul>
                {
                    status !== 'all' ?
                        user.categories.find((item) => item.categoryName === status).tasks.map((item) => (
                            <li key={item.id}>{item.taskTitle}</li>
                        )) : ''
                }
            </ul>
        </>
    );
};

export default ContentCategory;