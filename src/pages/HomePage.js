import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import {useNavigate } from "react-router-dom"
import apiTransactions from "../services/apiTransactions"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"

export default function HomePage() {

  const [transacao, setTransacao] = useState([])
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)

  useEffect(()=>{
    if(!user){
      navigate("/")
    }
  }, [navigate, user])

  useEffect(getListaTransacoes, [user.token])

  function handleEntrada(){
    navigate("/nova-transacao/entrada")
  }

  function handleSaida(){
    navigate("/nova-transacao/saida")
  }

  function getListaTransacoes(){
    apiTransactions.getTransactions(user.token)
      .then(res=>{
        console.log(res.data)
        setTransacao(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
  }

  function somaTotal() {
    return transacao.reduce((acc, curr) => {
      if (curr.tipo === "entrada") {
        return acc + Number(curr.valor)
      } else {
        return acc - Number(curr.valor)
      }
    }, 0)
  }

  function sair() {
    setUser("")
    localStorage.setItem("user", JSON.stringify(""))
    navigate("/")
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.nome}</h1>
        <BiExit onClick={sair}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transacao.map(t=>(
                      <ListItemContainer key={t._id}>
                        <div>
                          <span>{t.data}</span>
                          <strong>{t.descricao}</strong>
                        </div>
                        <Value color={t.tipo}>{Number(t.valor).toFixed(2)}</Value>
                    </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={somaTotal() >= 0 ? "entrada" : "saida"}>
            {somaTotal().toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={handleEntrada}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>


        <button onClick={handleSaida}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
  h1{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
  }
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative; 
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  ul {
    max-height: 370px; 
    overflow: auto; 
  }
`

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`