import { useState, useReducer, createContext, useContext } from "react"
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"


// Reducer
function reducer(isLogin, action) {
  if (action === "login") {
    return true
  }

  if (action === "logout") {
    return false
  }

  return isLogin
}


// Context
const LoginContext = createContext()


function Login({ onLogin }) {
  const [signIn, setSignIn] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(e) {
    e.preventDefault()

    if (signIn === "test@gmail.com" && password === "123456") {
      alert("Sign Successful")
      localStorage.setItem("Login", "true")
      onLogin()
    } else {
      alert("Wrong email or password")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form className="flex flex-col gap-3 w-64" onSubmit={handleLogin}>

        <input
          className="border p-2 rounded bg-white"
          type="text"
          placeholder="Email"
          value={signIn}
          onChange={(e) => setSignIn(e.target.value)}
        />

        <input
          className="border p-2 rounded bg-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="font-bold bg-black text-white p-2 rounded"
          type="submit"
        >
          Login
        </button>

      </form>
    </div>
  )
}


function Home() {
  return (
    <h1 className="text-2xl font-bold text-center mt-8">
      Home page
    </h1>
  )
}


function Product() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  const products = [
    { name: "Shoes", price: 200 },
    { name: "T-Shirt", price: 400 },
  ]

  function addToCart(item) {
    setCart([...cart, item])
    setTotal(total + item.price)
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-8">

      <h1 className="text-2xl font-bold">
        My Products Shop
      </h1>

      <p className="font-bold">
        Total: Rs.{total}
      </p>

      <div className="flex justify-center gap-6 flex-wrap">

        {products.map((item) => (
          <div
            key={item.name}
            className="border rounded p-4 w-40 flex flex-col items-center gap-2 bg-gray-100"
          >

            <h3 className="font-bold">
              {item.name}
            </h3>

            <p>
              Rs.{item.price}
            </p>

            <button
              className="font-bold bg-black text-white px-3 py-1 rounded"
              onClick={() => addToCart(item)}
            >
              Add To Cart
            </button>

          </div>
        ))}

      </div>
    </div>
  )
}


// Navbar
function Navbar() {

  const { logout } = useContext(LoginContext)

  return (
    <nav className="flex justify-center gap-4 p-4 bg-gray-600 font-bold">

      <Link to="/">
        Home
      </Link>

      <Link to="/product">
        Product
      </Link>

      <button onClick={logout}>
        Logout
      </button>

    </nav>
  )
}


function App() {

  const [isLogin, dispatch] = useReducer(
    reducer,
    localStorage.getItem("Login") === "true"
  )


  function login() {
    dispatch("login")
  }


  function logout() {
    localStorage.removeItem("Login")
    dispatch("logout")
  }


  return (
    <LoginContext.Provider
      value={{
        isLogin,
        login,
        logout
      }}
    >

      <BrowserRouter>

        {isLogin ? (
          <>

            <Navbar />

            <Routes>

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/product"
                element={<Product />}
              />

              <Route
                path="*"
                element={<Navigate to="/" />}
              />

            </Routes>

          </>
        ) : (

          <Routes>

            <Route
              path="/login"
              element={<Login onLogin={login} />}
            />

            <Route
              path="*"
              element={<Navigate to="/login" />}
            />

          </Routes>

        )}

      </BrowserRouter>

    </LoginContext.Provider>
  )
}


export default App