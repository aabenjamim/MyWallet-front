import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

function login(body){
    const promise = axios.post(`${process.env.BASE_URL}`, body)
    return promise
}

function cadastro(body){
    const promise = axios.post(`${process.env.BASE_URL}/cadastro`, body)
    return promise
}

const apiAuth = {login, cadastro}
export default apiAuth

