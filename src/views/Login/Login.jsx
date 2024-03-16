import "./Login.css"
import Header from "../../components/Header/Header";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {login, registration} from "../../api";
import {toast, Toaster} from "react-hot-toast";

const Login = () => {
    const nav = useNavigate()

    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setPassword] = useState()

    const [errors, setErrors] = useState({})

    useEffect(() => {
        setErrors({
            ...errors,
            phone: []
        })
    }, [phoneNumber])

    useEffect(() => {
        setErrors({
            ...errors,
            password: []
        })
    }, [password])

    const log = async () => {
        const resp = await login({
            phone: phoneNumber,
            password: password
        })

        console.log(resp)

        if (resp.status == 422) {
            setErrors(resp.response.error.errors)
        }
        if (resp.status == 401) {
            toast.error(resp.response.error.errors[0])
        }

        if (resp.status == 409) {
            toast.error(resp.response.error.message)
        }

        if (resp.status == 200) {
            localStorage.setItem("token", resp.response.data.token)
            nav("/account")
        }
    }

    return (
        <>
            <Toaster />
            <Header/>

            <section className="login-block">
                <h1>Login</h1>
                <form>
                    <div className="input">
                        <p>Phone Number</p>
                        <input type="text" name="phone" id="phone" className="test-1-fpn"
                               placeholder="+7 777 777 77 77" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        {errors["phone"] && <p className={"error"}>{errors["phone"][0]}</p>}
                    </div>
                    <div className="input">
                        <p>Password</p>
                        <input type="password" name="password" id="password" className="test-1-fps" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors["password"] && <p className={"error"}>{errors["password"][0]}</p>}
                    </div>
                    <button type="submit" className="test-1-fbs" onClick={(e) => {
                        e.preventDefault()
                        log()
                    }}>Login</button>
                </form>
                <br />
                <p>Don't have account? <a href="/register">Click to register</a></p>
            </section>
        </>
    )
}

export default Login