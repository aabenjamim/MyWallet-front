import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useEffect } from "react"
import apiAuth from "../services/apiAuth"

export default function SignUpPage() {

  const [form, setForm] = useState({nome: "", email: ""})
  const [senhanova, setSenha] = useState("")
  const [senharepetida, setSenhaRepetida] = useState("")
  const [confere, setConfere] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setConfere(senhanova === senharepetida);
  }, [senhanova, senharepetida])


  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSignUp(e){
    e.preventDefault()

    if(confere){    
      apiAuth.cadastro({...form, senha:senhanova})
      .then(res=>{
        alert(res.data)
        navigate("/")
      })
      .catch(err =>{
        console.log(err.response.data)
        alert(err.response.data.message)
      })
    }
    else{
      return alert('Senhas não correspondem!')
    }

  }


  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input 
          name="nome"
          placeholder="Nome" 
          type="text" 
          value={form.nome}
          onChange={handleForm}
          required />
        <input 
          name="email"
          placeholder="E-mail"
          type="email" 
          value={form.email}
          onChange={handleForm}
          required/>
        <input 
          name="senhanova"
          placeholder="Senha" 
          type="password" 
          value={senhanova}
          autoComplete="new-password"
          onChange={(e)=>setSenha(e.target.value)}
          required/>
        <input 
          name="senharepetida"
          placeholder="Confirme a senha" 
          type="password" 
          value={senharepetida}
          autoComplete="new-password"
          onChange={(e)=>setSenhaRepetida(e.target.value)}
          required/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
