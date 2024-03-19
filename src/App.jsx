import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import "./App.css"
import { Footer, Header } from "./components"
import {Outlet} from "react-router-dom"

function App() {
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData))
                } else {
                    dispatch(logout())
                }
            })
            .catch((error) => {
                // console.log("App.Jsx :: UserStatus :: Error", error)
            })
            .finally(() => setloading(false))
    }, [])

    return !loading ? (
        <div className="min-h-screen flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    Todo: <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null
}

export default App
