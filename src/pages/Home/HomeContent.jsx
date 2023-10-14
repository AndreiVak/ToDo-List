import React, {useContext} from 'react';
import {CustomContext} from "../../utils/Context";
import './homeContent.scss'
import ContentCategory from "../../Components/ContentCategory/ContentCategory";


const HomeContent = () => {

    const {status, user} = useContext(CustomContext)

    return (
        <div className='content'>

            {
                status === 'all' ? user.categories.map((item) => (
                    <ContentCategory key={item.id} status={item.categoryName}/>
                )) : <ContentCategory status={status}/>
            }


        </div>
    );
};

export default HomeContent;