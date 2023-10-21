import React, {useContext, useState} from 'react';
import {BsPencil} from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai"
import {CustomContext} from "../../utils/Context";
import ContentCheckBox from "./ContentCheckBox";
import {useForm} from "react-hook-form";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {toast} from "react-toastify";

const ContentCategory = ({status}) => {

    const {user, setUser} = useContext(CustomContext)

    const {
        register,
        handleSubmit,
        reset,
        formState:{
            errors
        }
    } = useForm({
        mode: 'onBlur'
    })

    const [show, setShow] = useState(false)

    const addTask = (data) => {
        console.log(data)
        let newTask = {
            ...data,
            id:uuidv4(),
            isComplete: false
        }

        let newCategories = user.categories.map((item) => {
            if (item.categoryName === status) {
                return {...item, tasks : [...item.tasks, newTask]}
            }
            return item
        })

        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newCategories})
            .then(({data}) => {
                setUser({
                    ...data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))
                setShow(false)
                reset()
                toast("Задача добавлена!")
            })
            .catch((err) => toast(`Задача не добавлена! ${err.message}`))
    }

    return (
        <>
            <div className='content__top'>
                <h2 className='content__title'> {status} </h2>
                <span className='content__edit'><BsPencil/></span>
            </div>
            <ul className='content__menu'>
                {
                    status !== 'all' ?
                        user.categories.find((item) => item.categoryName === status).tasks.map((item) => (
                            <li className='content__item' key={item.id}>
                                <ContentCheckBox isComplete={item.isComplete}/>
                                {item.taskTitle}
                            </li>
                        )) : ''
                }
            </ul>
            {
                show ?
                    <form noValidate className='content__add' onSubmit={handleSubmit(addTask)}>
                    <input {...register('taskTitle', {
                        required : {
                            message: "Название задачи обязательно к заполнению",
                            value: true
                        },
                        minLength: {
                            message: "Минимальная длинна 3 символа",
                            value: 3
                        }
                    })} placeholder='Текст задачи' type="text" className='content__add-field'/>
                    <span className='form__error'>{errors.taskTitle && errors.taskTitle.message}</span>
                    <div className='content__add-action'>
                        <button className='content__add-btn'>Добавить задачу</button>
                        <div className='content__add-close' onClick={() => setShow(false)}>Отмена</div>
                    </div>
                </form>
                    : <div className="content__bottom">
                        <AiOutlinePlus className='content__bottom-icon' onClick={() => setShow(true)}/>
                        <p className="content__bottom-text" onClick={() => setShow(true)}>Новая задача</p>
                    </div>
            }


        </>
    );
};

export default ContentCategory;