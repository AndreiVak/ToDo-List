import React, {useContext} from 'react';
import './aside.scss'
import {CustomContext} from "../../../utils/Context";
import 'react-toastify/dist/ReactToastify.css';
import AsideAll from "./AsideAll/AsideAll";
import AsideMenu from "./AsideMenu/AsideMenu";
import AsideCreateCategory from "./AsideCreateCategory/AsideCreateCategory";


const Aside = () => {

    const {logOutUser} = useContext(CustomContext)

    return (
            <aside className="aside">
                <AsideAll/>
                <AsideMenu/>
                <AsideCreateCategory/>
                <button className="aside__leave" onClick={logOutUser}>Выйти</button>
            </aside>
    );
};

export default Aside;