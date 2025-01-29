import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

export const Home = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (location.pathname.match("/")) {
            navigate("/dashboard")
        }
    },[location.pathname, navigate])

    return (
        <></>
    )
}