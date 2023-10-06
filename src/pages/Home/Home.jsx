import React, {useContext} from 'react';
import {CustomContext} from "../../utils/Context";
import {Navigate} from 'react-router-dom'
import Aside from "./Aside";
import {ToastContainer} from "react-toastify";



const Home = () => {

    const {user} = useContext(CustomContext)

    if (user.email.length === 0){
        return <Navigate to='/login'/>
    }

    return (
        <section className="home">
            <Aside/>
            <div className="content"></div>
            <ToastContainer/>
        </section>
    );
};

export default Home;