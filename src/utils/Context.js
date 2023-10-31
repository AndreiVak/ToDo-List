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
    const [show, setShow] = useState(false)

    const changeUser = (res, token) => {
        setUser({
            token : token,
            ...res
        })
        localStorage.setItem('user', JSON.stringify({
            token : token,
            ...res
        }))
    }

    const registerUser = (data) => {
        axios.post('http://localhost:8080/register ', {
            ...data,
            categories: []
        }).then((res) => {
            changeUser(res.data.user, res.data.accessToken)
            navigate('/')
        })
            .catch((err) => console.log(err))
    }

    const loginUser = (data) => {
        axios.post('http://localhost:8080/login ', {
            ...data
        }).then((res) => {
            changeUser(res.data.user, res.data.accessToken)
            navigate('/')
        })
            .catch((err) => console.log(err))
    }

    const logOutUser = () => {
        localStorage.removeItem('user')
        setUser({
            email: ''
        })
    }

    const delCategory= (id) => {
        let newArrayCategories = user.categories.filter((item) => item.id !== id)
        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newArrayCategories})
            .then((res) => {
                changeUser(res.data, user.token)
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
            .then((res) => {
                changeUser(res.data, user.token)
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

    const handleChangeCategory = (data, statusContent, setShowTitle) => {
        let newArrayCategories = user.categories.map((item) => item.categoryName === statusContent ? {...item, categoryName : data.categoryName} : item)

        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newArrayCategories})
            .then((res) => {
                changeUser(res.data , user.token)
                setStatus(data.categoryName)
                setShowTitle(false)
                toast("Название измененно")
            })
            .catch((err) => toast(`Название не измененно ${err.message}`))
    }

    const checkCategoryName = (data, statusContent, setShowTitle) => {
        if (data.categoryName === 'all'){
            toast('Название категории не может быть all')
        } else {
            handleChangeCategory(data, statusContent, setShowTitle)
        }
    }

    const delTask = (id, statusContent) => {
        let newCategories = user.categories.map((item) => {
            if (item.categoryName === statusContent) {
                return {...item, tasks : item.tasks.filter((el) => el.id !== id)}
            }
            return item
        })

        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newCategories})
            .then((res) => {
                changeUser(res.data, user.token)
                toast("Задача удалена!")
            })
            .catch((err) => toast(`Задача не удалена! ${err.message}`))
    }

    const handleCompleteTask = (id, statusContent) => {
        let newCategories = user.categories.map((item) => {
            if (item.categoryName === statusContent) {
                return {...item, tasks : item.tasks.map((el) => el.id === id ? {...el, isComplete : !el.isComplete} : el)}
            }
            return item
        })
        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newCategories})
            .then((res) => {
                changeUser(res.data, user.token)
            })
            .catch((err) => toast(`${err.message}`))
    }

    const addTask = (data, statusContent) => {
        // console.log(data)
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
            .then((res) => {
                changeUser(res.data, user.token)
                setShow(false)
                toast("Задача добавлена!")
            })
            .catch((err) => toast(`Задача не добавлена! ${err.message}`))
    }

    const checkTasks = (data, statusContent) => {
        let has = user.categories.find((item) => item.categoryName === statusContent).tasks.findIndex((item) => item.taskTitle === data.taskTitle)
        if (has > -1) {
            toast('Такая задача уже существует!')
        } else {
            addTask(data, statusContent)
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
        checkNameCategories,
        logOutUser,
        handleChangeCategory,
        checkCategoryName,
        delTask,
        handleCompleteTask,
        addTask,
        checkTasks
    }

    return  <CustomContext.Provider value={value}>
                {props.children}
            </CustomContext.Provider>
};


