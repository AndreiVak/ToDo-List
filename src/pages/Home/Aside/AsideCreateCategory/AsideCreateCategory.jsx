import React, {useState} from 'react';
import {AiOutlinePlus} from "react-icons/ai";
import AsideCreatePopup from "./AsideCreatePopup";


const AsideCreateCategory = () => {

    const [active, setActive] = useState(false)

    return (
        <div style={{position: "relative"}}>
            <div className="aside__create" onClick={() => setActive(prev => !prev)}>
                <span><AiOutlinePlus/></span>
                <span className="aside__text">Добавить папку</span>
            </div>
            <AsideCreatePopup active={active} setActive={setActive}/>
        </div>
    );
};

export default AsideCreateCategory;