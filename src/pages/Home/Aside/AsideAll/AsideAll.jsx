import React, {useContext} from 'react';
import {HiMenuAlt1} from "react-icons/hi";
import {CustomContext} from "../../../../utils/Context";

const AsideAll = () => {

    const {status, setStatus} = useContext(CustomContext)

    return (

        <div className={`aside__all ${status === 'all' ? 'active' : ''}`} onClick={() => setStatus('all')}>
                <span><HiMenuAlt1/></span>
                <span className="aside__text">Все задачи</span>
        </div>

    );
};

export default AsideAll;