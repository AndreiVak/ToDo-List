import React, {useContext, useState} from 'react';
import {BsPencil} from "react-icons/bs";
import {useForm} from "react-hook-form";
import {CustomContext} from "../../../utils/Context";


const ContentCategoryTitle = ({statusContent}) => {

    const [showTitle, setShowTitle] = useState(false)

    const {checkCategoryName} = useContext(CustomContext)

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
                showTitle ? <form noValidate className='content__add' onSubmit={handleSubmit((data) => checkCategoryName(data, statusContent, setShowTitle))}>
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
        </>
    );
};

export default ContentCategoryTitle;