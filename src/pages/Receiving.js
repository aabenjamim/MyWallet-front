import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Receiving() {

  const navigate = useNavigate()

  function handleHome(){
    navigate("/home")
  }

  return (
    <TransactionsContainer>
      <h1>Nova Entrada</h1>
      <form onSubmit={handleHome}>
        <input placeholder="Valor" type="text"/>
        <input placeholder="Descrição" type="text" />
        <button>Salvar Entrada</button>
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
