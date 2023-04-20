import axios from "axios"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

function login(body){
    //const promise = axios.post(`${process.env.REACT_APP_API_URL}/`, body)
    const promise = axios.post(`${REACT_APP_API_URL}/`, body)
    return promise
}

function cadastro(body){
    //const promise = axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, body)
    const promise = axios.post(`${REACT_APP_API_URL}/cadastro`, body)
    return promise
}

const apiAuth = {login, cadastro}
export default apiAuth

