import React, {useContext} from 'react';
import {Link, useNavigate, useLocation, Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import './form.scss'
import {CustomContext} from "../../utils/Context";

const Form = () => {

    const location = useLocation()

    const {user, registerUser, loginUser} = useContext(CustomContext)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({mode: "onBlur"})


    const onSubmit = (data) => {
        location.pathname === '/register' ? registerUser(data) : loginUser(data)
    }

    if (user.email.length !== 0){
        return <Navigate to='/'/>
    }

    return (
        <form noValidate action="" className='form' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='form__title'>
                {
                   location.pathname === "/register" ? 'Регистрация' : 'Вход'
                }
            </h2>

            {
                location.pathname === "/register" ? <label className='form__label'>
                    <input {...register('login', {
                        required : {
                            message: "Поле логин, обязательно к заполнению",
                            value: true
                        },
                        maxLength: {
                            message: "Максималная длинна 10 символов",
                            value: 10
                        },
                        minLength: {
                            message: "Минимальная длинна 3 символа",
                            value: 3
                        }
                    })} className='form__field' type="text" placeholder='Введите логин'/>

                    <span className='form__error'>{errors.login && errors.login.message}</span>
                </label> : ''
            }

            <label className='form__label'>
                <input {...register('email', {
                    required: {
                        message: 'Email обязателен к заполнению',
                        value: true
                    },
                    minLength: {
                        message: 'Минимум 10 символов',
                        value: 10
                    },
                    pattern: {
                        message: 'Напишите правильно свой email',
                        value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/
                    }
                })} className='form__field' type="email" placeholder='Введите Email'/>
                <span className='form__error'>{errors.email && errors.email.message}</span>
            </label>

            <label className='form__label'>
                <input {...register('password', {
                    required: {
                        message: 'Пароль обязателен к заполнению',
                        value: true
                    },
                    pattern: {
                        value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                        message: 'Пароль должен содержать не менее 8 символов, заглавную букву, число!'
                    }
                })} className='form__field' type="password" placeholder='Введите пароль'/>
                <span className='form__error'>{errors.password && errors.password.message}</span>
            </label>

            {/*<label className='form__label'>*/}
            {/*    <input className='form__field' type="password" placeholder='Введите пароль еще раз'/>*/}
            {/*</label>*/}

            <button className='form__btn' type='submit'>
                {
                    location.pathname === "/register" ? 'Зарегистрироваться' : 'Войти'
                }
            </button>

            <p className='form__text'>
                {
                    location.pathname === "/register"
                        ? <>У меня уже есть аккаунт чтобы <Link className='form__link' to='/login'>войти</Link></>
                        : <>Еще нет аккаунта? <Link className='form__link' to='/register'>Зарегистрироваться</Link> </>
                }
            </p>
        </form>
    );
};

export default Form;