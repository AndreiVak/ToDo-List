import React from 'react';
import './register.scss'
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import * as url from "url";


const Register = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: {
           errors
        }
    } = useForm({mode: "onBlur"})

    const registerUser = (data) => {
      axios.post('http://localhost:8080/users ', {
          ...data,
          categories: []
      }).then((res) => console.log(res))
          .catch((err) => console.log(err))
    }
    
    return (
        <div className='register'>
            <form noValidate action="" className='form' onSubmit={handleSubmit(registerUser)}>
                <h2 className='form__title'>Регистрация</h2>

                <label className='form__label'>
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
                </label>

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

                <button className='form__btn' type='submit'>Зарегистрироваться</button>

                <p className='form__text'>У меня уже есть аккаунт чтобы <Link className='form__link' to='/login'>войти</Link></p>
            </form>
        </div>
    );
};

export default Register;