import {createContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";


export const CustomContext = createContext()

export const Context = (props) => {

    const [user, setUser] = useState({
        email: ''
    })

    const navigate = useNavigate()

    const [status, setStatus] = useState('all')


    const registerUser = (data) => {
        axios.post('http://localhost:8080/register ', {
            ...data,
            categories: []
        }).then((res) => {
            setUser({
                token : res.data.accessToken,
                ...res.data.user
            })
            localStorage.setItem('user', JSON.stringify({
                token : res.data.accessToken,
                ...res.data.user
            }))
            navigate('/')
        })
            .catch((err) => console.log(err))
    }

    const loginUser = (data) => {
        axios.post('http://localhost:8080/login ', {
            ...data
        }).then((res) => {
            setUser({
                token : res.data.accessToken,
                ...res.data.user
            })
            localStorage.setItem('user', JSON.stringify({
                token : res.data.accessToken,
                ...res.data.user
            }))
            navigate('/')
        })
            .catch((err) => console.log(err))
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

    const addCategory = (category, color, setActive, setCategory) => {
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

    const checkNameCategories = (category, color, setActive, setCategory) => {
        if (user.categories.findIndex((item) => item.categoryName === category) > -1) {
            toast('Такая категория уже существует!')
        } else {
            addCategory(category, color, setActive, setCategory)
        }
    }


    const value = {
        user,
        setUser,
        status,
        setStatus,
        registerUser,
        loginUser,
        delCategory,
        checkNameCategories
    }

    return  <CustomContext.Provider value={value}>
                {props.children}
            </CustomContext.Provider>
};


