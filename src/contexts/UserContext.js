import { createContext } from "react"

export const UserContext = createContext()

/*export default function UserProvider({ children }) {
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}*/
