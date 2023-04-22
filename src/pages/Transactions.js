import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import apiTransactions from "../services/apiTransactions"
import { UserContext } from "../contexts/UserContext"

export default function Transactions() {

  const {tipo} = useParams()

  const navigate = useNavigate()

  const [form, setForm] = useState({valor:"", descricao:""})
  const {user} = useContext(UserContext)


  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleHome(e){
    e.preventDefault()
    const body = {...form, tipo: tipo}
    apiTransactions.postTransaction(user.token, body, tipo)
    .then(res=>{
      setForm({valor:"", descricao:""})
    })
    .catch(err=>{
      console.log(err.response.data.message)
      alert(err.response.data.message)
    })
    navigate("/home")
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={handleHome}>
        <input placeholder="Valor" type="number" name="valor" value={form.valor} 
        onChange={handleForm} required/>
        <input placeholder="Descrição" type="text" name="descricao" 
        value={form.descricao} onChange={handleForm} required/>
        <button>Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
