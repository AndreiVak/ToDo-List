import React, {useContext} from 'react';
import {CustomContext} from "../../utils/Context";
import {Navigate} from 'react-router-dom'
import Aside from "./Aside";



const Home = () => {

    const {user} = useContext(CustomContext)

    if (user.email.length === 0){
        return <Navigate to='/login'/>
    }

    return (
        <section className="home">
            <Aside/>
            <div className="content">

            </div>

        </section>
    );
};

export default Home;