import "./Registration.css"
import Header from "../../components/Header/Header";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {registration} from "../../api";
import {toast, Toaster} from "react-hot-toast";

const Registration = () => {
    const nav = useNavigate()

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [docNumber, setDocNumber] = useState()
    const [password, setPassword] = useState()

    const [errors, setErrors] = useState({})

    useEffect(() => {
        setErrors({
            ...errors,
            first_name: []
        })
    }, [firstName])

    useEffect(() => {
        setErrors({
            ...errors,
            last_name: []
        })
    }, [lastName])

    useEffect(() => {
        setErrors({
            ...errors,
            phone: []
        })
    }, [phoneNumber])

    useEffect(() => {
        setErrors({
            ...errors,
            document_number: []
        })
    }, [docNumber])

    useEffect(() => {
        setErrors({
            ...errors,
            password: []
        })
    }, [password])

    async function reg() {
        const resp = await registration({
            first_name: firstName,
            last_name: lastName,
            phone: phoneNumber,
            document_number: docNumber,
            password: password
        })

        console.log(resp)

        if (resp.status == 422) {
            setErrors(resp.response.error.errors)
        }

        if (resp.status == 409) {
            toast.error(resp.response.error.message)
        }

        if (resp.status == 204) {
            nav("/login")
        }
    }

    return (
        <>
            <Toaster />
            <Header/>

            <section className="login-block">
                <h1>Registration</h1>
                <form>
                    <div className="input">
                        <p>Fist Name</p>
                        <input type="text" name="first_name" id="first_name" className="test-2-name" placeholder="John"
                               required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        {errors["first_name"] && <p className={"error"}>{errors["first_name"][0]}</p>}
                    </div>
                    <div className="input">
                        <p>Last Name</p>
                        <input type="text" name="last_name" id="last_name" className="test-2-last" placeholder="Doe"
                               required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        {errors["last_name"] && <p className={"error"}>{errors["last_name"][0]}</p>}
                    </div>
                    <div className="input">
                        <p>Phone Number</p>
                        <input type="text" name="phone" id="phone" className="test-2-phone"
                               placeholder="+7 777 777 77 77" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        {errors["phone"] && <p className={"error"}>{errors["phone"][0]}</p>}
                    </div>
                    <div className="input">
                        <p>Document Number</p>
                        <input type="text" name="document_number" id="document_number" className="test-2-doc"
                               placeholder="AA1234567" required value={docNumber} onChange={(e) => setDocNumber(e.target.value)} />
                        {errors["document_number"] && <p className={"error"}>{errors["document_number"][0]}</p>}
                    </div>
                    <div className="input">
                        <p>Password</p>
                        <input type="password" name="password" id="password" className="test-2-pass" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors["password"] && <p className={"error"}>{errors["password"][0]}</p>}
                    </div>
                    <button type="submit" className="test-2-btn" onClick={(e) => {
                        e.preventDefault()
                        reg()
                    }}>Register</button>
                </form>
            </section>
        </>
    )
}

export default Registration