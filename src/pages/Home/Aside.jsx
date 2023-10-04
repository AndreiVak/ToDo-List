import React, {useContext, useState} from 'react';
import {HiMenuAlt1} from 'react-icons/hi'
import {AiOutlinePlus, AiFillCloseCircle} from 'react-icons/ai'
import './aside.scss'
import {dataColors} from "../../utils/dataColors";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {CustomContext} from "../../utils/Context";

const Aside = () => {

    const [active, setActive] = useState(false)
    const [color, setColor] = useState(dataColors[0])
    const [category, setCategory] = useState('')

    const {user, setUser} = useContext(CustomContext)

    const addCategory = () => {
        let newCategory = {
            categoryName: category,
            id:uuidv4(),
            color,
            tasks:[]
        }
        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: [...user.categories, newCategory]})
            .then(({data}) => {
              setUser({
                  ...data,
                  token: user.token
              })
              localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))
              setActive(false)
              setCategory('')
            })
            .catch((err) => console.log(err))
    }


    return (
            <aside className="aside">
                <div className="aside__all">
                    <span><HiMenuAlt1/></span>
                    <span className="aside__text">Все задачи</span>
                </div>

                <ul className="aside__menu">
                    {
                        user.categories.map((item) => (
                            <li key={item.id} className="aside__item">
                                <span style={{background: item.color}} className="aside__color"></span>
                                <span className="aside__text">{item.categoryName}</span>
                            </li>
                        ))
                    }
                </ul>

                <div style={{position: "relative"}}>
                    <div className="aside__create" onClick={() => setActive(prev => !prev)}>
                        <span><AiOutlinePlus/></span>
                        <span className="aside__text">Добавить папку</span>
                    </div>
                    <div style={{display: active ? 'block' : 'none'}} className="aside__popup">
                        <input value={category} onChange={(e) => setCategory(e.target.value)} className="aside__field" placeholder="Название папки" type="text"/>
                        <div className="aside__colors">
                            {dataColors.map((item) => (
                                <span onClick={() => setColor(item)} className="aside__col" key={item} style={{background : item, border: color === item ? '3px solid black' : 'none'}}/>
                            ))}
                        </div>
                        <button type="button" className="aside__add" onClick={addCategory}>Добавить</button>
                        <span className="aside__popup-close" onClick={() => setActive(false)}><AiFillCloseCircle/></span>
                    </div>
                </div>
            </aside>
    );
};

export default Aside;