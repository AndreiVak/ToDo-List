import React, {useContext} from 'react';
import {AiOutlineClose} from "react-icons/ai";
import {CustomContext} from "../../../../utils/Context";

const AsideMenu = () => {

    const {user, status, setStatus, delCategory} = useContext(CustomContext)

    return (
        <ul className="aside__menu">
                {
                    user.categories.map((item) => (
                        <li key={item.id} className={`aside__item ${status === item.categoryName ? 'active' : ''}`} onClick={() => setStatus(item.categoryName)}>
                            <span style={{background: item.color}} className="aside__color"></span>
                            <span className="aside__text">{item.categoryName}</span>
                            <span onClick={(e) => {
                                e.stopPropagation()
                                delCategory(item.id)
                            }} className="aside__item-del">
                                    <AiOutlineClose className='aside__item-del-icon'/>
                                </span>
                        </li>
                    ))
                }
        </ul>
    );
};

export default AsideMenu;