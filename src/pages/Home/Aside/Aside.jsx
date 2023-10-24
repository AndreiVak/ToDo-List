import React, {useContext} from 'react';
import './aside.scss'
import {CustomContext} from "../../../utils/Context";
import 'react-toastify/dist/ReactToastify.css';
import AsideAll from "./AsideAll/AsideAll";
import AsideMenu from "./AsideMenu/AsideMenu";
import AsideCreateCategory from "./AsideCreateCategory/AsideCreateCategory";


const Aside = () => {

    const {setUser} = useContext(CustomContext)

    const logOutUser = () => {
        localStorage.removeItem('user')
        setUser({
            email: ''
        })
    }

    return (
            <aside className="aside">
                <button className="aside__leave" onClick={logOutUser}>Выйти</button>
                <AsideAll/>
                <AsideMenu/>
                <AsideCreateCategory/>
            </aside>
    );
};

export default Aside;