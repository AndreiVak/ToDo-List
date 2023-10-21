import React, {useContext, useState} from 'react';
import {HiMenuAlt1} from 'react-icons/hi'
import {AiOutlinePlus, AiFillCloseCircle, AiOutlineClose} from 'react-icons/ai'
import './aside.scss'
import {dataColors} from "../../utils/dataColors";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {CustomContext} from "../../utils/Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Aside = () => {

    const [active, setActive] = useState(false)
    const [color, setColor] = useState(dataColors[0])
    const [category, setCategory] = useState('')

    const {user, setUser, status, setStatus} = useContext(CustomContext)

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
              toast("Категория добавлена!")
            })
            .catch((err) => toast(`Категория не добавлена! ${err.message}`))
    }

    const logOutUser = () => {
        localStorage.removeItem('user')
        setUser({
            email: ''
        })
    }

    const checkNameCategories = () => {
        if (user.categories.findIndex((item) => item.categoryName === category) > -1) {
            toast('Такая категория уже существует!')
        } else {
            addCategory()
        }
    }

    const delCategory= (id) => {
        let newArrayCategories = user.categories.filter((item) => item.id !== id)
        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newArrayCategories})
            .then(({data}) => {
                setUser({
                    ...data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))
                toast("Категория удалена!")
            }).catch((err) => toast(`Категория не удалена! ${err.message}`))
    }

    return (
            <aside className="aside">
                <button className="aside__leave" onClick={logOutUser}>Выйти</button>

                <div className={`aside__all ${status === 'all' ? 'active' : ''}`} onClick={() => setStatus('all')}>
                    <span><HiMenuAlt1/></span>
                    <span className="aside__text">Все задачи</span>
                </div>

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
                        <button type="button" className="aside__add" onClick={checkNameCategories}>Добавить</button>
                        <span className="aside__popup-close" onClick={() => setActive(false)}><AiFillCloseCircle/></span>
                    </div>
                </div>
            </aside>
    );
};

export default Aside;