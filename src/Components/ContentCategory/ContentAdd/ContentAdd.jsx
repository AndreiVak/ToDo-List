import React, {useContext, useState} from 'react';
import {AiOutlinePlus} from "react-icons/ai";
import {CustomContext} from "../../../utils/Context";
import {useForm} from "react-hook-form";


const ContentAdd = ({statusContent}) => {

    const [show, setShow] = useState(false)

    const {status,checkTasks} = useContext(CustomContext)

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm({
        mode: 'onBlur'
    })

    return (
        <>
            {
                status !== 'all' ? <>
                    {
                        show ?
                            <form noValidate className='content__add' onSubmit={handleSubmit((data) => checkTasks(data, statusContent))}>
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

export default ContentAdd;