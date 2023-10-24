import React, {useState, useContext} from 'react';
import {dataColors} from "../../../../utils/dataColors";
import {AiFillCloseCircle} from "react-icons/ai";
import {CustomContext} from "../../../../utils/Context";


const AsideCreatePopup = ({active, setActive}) => {

    const [color, setColor] = useState(dataColors[0])
    const [category, setCategory] = useState('')
    const {checkNameCategories} = useContext(CustomContext)

    return (
        <div style={{display: active ? 'block' : 'none'}} className="aside__popup">
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="aside__field" placeholder="Название папки" type="text"/>
            <div className="aside__colors">
                {dataColors.map((item) => (
                    <span onClick={() => setColor(item)} className="aside__col" key={item} style={{background : item, border: color === item ? '3px solid black' : 'none'}}/>
                ))}
            </div>
            <button type="button" className="aside__add" onClick={() => checkNameCategories(category, color, setCategory, setActive)}>Добавить</button>
            <span className="aside__popup-close" onClick={() => setActive(false)}><AiFillCloseCircle/></span>
        </div>
    );
};

export default AsideCreatePopup;