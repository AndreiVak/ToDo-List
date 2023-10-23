import React, {useContext, useState} from 'react';
import {BsPencil} from "react-icons/bs";
import {AiOutlinePlus, AiOutlineClose} from "react-icons/ai"
import {CustomContext} from "../../utils/Context";
import ContentCheckBox from "./ContentCheckBox";
import {useForm} from "react-hook-form";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {toast} from "react-toastify";

const ContentCategory = ({statusContent}) => {

    const {user, setUser, status, setStatus} = useContext(CustomContext)

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
    const [showTitle, setShowTitle] = useState(false)

    const addTask = (data) => {
        console.log(data)
        let newTask = {
            ...data,
            id:uuidv4(),
            isComplete: false
        }

        let newCategories = user.categories.map((item) => {
            if (item.categoryName === statusContent) {
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

    const checkTasks = (data) => {
        let has = user.categories.find((item) => item.categoryName === statusContent).tasks.findIndex((item) => item.taskTitle === data.taskTitle)
        if (has > -1) {
            toast('Такая задача уже существует!')
        } else {
            addTask(data)
        }
    }

    const delTask = (id) => {
        let newCategories = user.categories.map((item) => {
            if (item.categoryName === statusContent) {
                return {...item, tasks : item.tasks.filter((el) => el.id !== id)}
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
                toast("Задача удалена!")
            })
            .catch((err) => toast(`Задача не удалена! ${err.message}`))
    }

    const handleCompleteTask = (id) => {
        let newCategories = user.categories.map((item) => {
            if (item.categoryName === statusContent) {
                return {...item, tasks : item.tasks.map((el) => el.id === id ? {...el, isComplete : !el.isComplete} : el)}
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
            })
            .catch((err) => toast(`${err.message}`))
    }

    const handleChangeCategory = (data) => {
        let newArrayCategories = user.categories.map((item) => item.categoryName === statusContent ? {...item, categoryName : data.categoryName} : item)

        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newArrayCategories})
            .then((res) => {
                setUser({
                    ...res.data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...res.data,
                    token: user.token
                }))
                setStatus(data.categoryName)
                setShowTitle(false)
                toast("Название измененно")
            })
            .catch((err) => toast(`Название не измененно ${err.message}`))
    }

    const checkCategoryName = (data) => {
        if (data.categoryName === 'all'){
            toast('Название категории не может быть all')
        } else {
            handleChangeCategory(data)
        }
    }

    return (
        <>
            {
                showTitle ? <form noValidate className='content__add' onSubmit={handleSubmit(checkCategoryName)}>
                    <input defaultValue={statusContent} {...register('categoryName', {
                        required : {
                            message: "Название категории обязательно к заполнению",
                            value: true
                        },
                        minLength: {
                            message: "Минимальная длинна 3 символа",
                            value: 3
                        }
                    })} placeholder='Текст категории' type="text" className='content__add-field'/>
                    <span className='form__error'>{errors.categoryName && errors.categoryName.message}</span>
                    <div className='content__add-action'>
                        <button className='content__add-btn'>Изменить название категории</button>
                        <div className='content__add-close' onClick={() => setShowTitle(false)}>Отмена</div>
                    </div>
                </form>
                          : <div className='content__top'>
                        <h2 className='content__title'> {statusContent} </h2>
                        <span className='content__edit' onClick={() => setShowTitle(true)}><BsPencil/></span>
                    </div>
            }


            <ul className='content__menu'>
                {
                    statusContent !== 'all' ?
                        user.categories.find((item) => item.categoryName === statusContent).tasks.map((item) => (
                            <li className='content__item' key={item.id}>
                                <ContentCheckBox isComplete={item.isComplete} handleCompleteTask={handleCompleteTask} id={item.id}/>
                                {item.taskTitle}

                                <span className='content__item-del' onClick={() => delTask(item.id)}><AiOutlineClose/></span>
                            </li>
                        )) : ''
                }
            </ul>
            {
                status !== 'all' ? <>
                    {
                        show ?
                            <form noValidate className='content__add' onSubmit={handleSubmit(checkTasks)}>
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
                </> : ''
            }



        </>
    );
};

export default ContentCategory;