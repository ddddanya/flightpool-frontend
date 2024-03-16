import "./Booking.css"
import Header from "../../components/Header/Header";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {booking, getUser} from "../../api";

const Booking = () => {
    const nav = useNavigate()
    const [query] = useSearchParams()

    const [passengers, setPassengers] = useState([{
        first_name: "",
        last_name: "",
        birth_date: "",
        document_number: ""
    }])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            async function fetchData() {
                const user = await getUser()

                const newPassengers = [...passengers]
                newPassengers[0] = user
                setPassengers(newPassengers)
            }

            fetchData()
        }
    }, [])

    const book = async () => {
        for (let i = 0; i < passengers.length; i++) {
            if (!passengers[i].first_name) {
                alert(`First name of passenger ${i + 1} is required`)
                return
            }
            if (!passengers[i].last_name) {
                alert(`Last name of passenger ${i + 1} is required`)
                return
            }
            if (!passengers[i].birth_date) {
                alert(`Date of birth of passenger ${i + 1} is required`)
                return
            }
            if (!passengers[i].document_number) {
                alert(`Document number of passenger ${i + 1} is required`)
                return
            }
        }

        const res = await booking({
            "flight_from": {
                "id": query.get("id"),
                "date": query.get("date"),
            },
            "passengers": passengers
        })

        if (res.status === 201) {
            alert("Booked successfully. Your booking code is " + res.response.data.code)
            nav("/")
        }

        if (res.status === 422) {
            const err = Object.keys(res.response.error.errors)

            alert(`${err[0]}: ${res.response.error.errors[err[0]][0]}`)
        }
    }

    return (
        <>
            <Header />

            <section className="results">
                <div className="item">
                    <div className="main-content">
                        <div className="info">
                            <div className="left">
                                <div className="flight-number test-4-fn">
                                    {query.get("flight_number")}
                                </div>
                                <div className="route test-5-tcity test-5-fcity">
                                    {query.get("city_from")} - {query.get("city_to")}
                                </div>
                            </div>
                            <div className="content">
                                <div className="airports test-5-from test-5-to">
                                    {query.get("airport_from")} - {query.get("airport_to")}
                                </div>
                                <div className="date test-5-dt test-5-at">
                                    <b className="test-5-dd">{query.get("date")}</b> {query.get("time_from")} - {query.get("time_to")}
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="price test-5-fp">
                                {query.get("cost")}$
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="passengers">
                <h1>Passengers information</h1>
                {passengers.map(item => {
                    return (
                        <>
                <div className="item">
                                <div className="form">
                                    <div className="input">
                                        <p>First Name</p>
                                        <input type="text" name="first_name" id="first_name" className="test-5-name"
                                               placeholder="John" required value={item.first_name} onChange={(e) => {
                                            const newPassengers = [...passengers]
                                            newPassengers[passengers.indexOf(item)].first_name = e.target.value
                                            setPassengers(newPassengers)
                                        }
                                        }/>
                                    </div>
                                    <div className="input">
                                        <p>Last Name</p>
                                        <input type="text" name="last_name" id="last_name" className="test-5-last"
                                               placeholder="Doe"
                                               required value={item.last_name} onChange={(e) => {
                                            const newPassengers = [...passengers]
                                            newPassengers[passengers.indexOf(item)].last_name = e.target.value
                                            setPassengers(newPassengers)
                                        }}/>
                                    </div>
                                    <div className="input">
                                        <p>Date of Birth</p>
                                        <input type="date" name="date_of_birth" id="date_of_birth"
                                               className="test-5-dob" required value={item.birth_date} onChange={(e) => {
                                            const newPassengers = [...passengers]
                                            newPassengers[passengers.indexOf(item)].birth_date = e.target.value
                                            setPassengers(newPassengers)

                                        }}/>
                                    </div>
                                    <div className="input">
                                        <p>Document Number</p>
                                        <input type="text" name="document_number" id="document_number"
                                               className="test-5-doc"
                                               placeholder="AA1234567" required value={item.document_number} onChange={(e) => {
                                            const newPassengers = [...passengers]
                                            newPassengers[passengers.indexOf(item)].document_number = e.target.value
                                            setPassengers(newPassengers)
                                        }}/>
                                    </div>
                                </div>


                    <div className="buttons">
                        <button className="test-5-remove" onClick={() => {
                            if (passengers.length == 1) return alert("You cant remove last passenger")
                            setPassengers(passengers.filter(i => i !== item))
                        }}>Remove</button>
                    </div>
                </div>
                        </>
                    )
                })}

                <div className="button test-5-add" onClick={() => {
                    setPassengers([...passengers, {
                        first_name: "",
                        last_name: "",
                        birth_date: "",
                        document_number: ""
                    }])
                }}>
                    Add passenger
                </div>

            </section>

            <section className="total">
                <div className="price test-5-price">
                    Total: {query.get("cost") * passengers.length}$
                </div>
                <div className="button test-5-book" onClick={book}>
                    Book
                </div>
            </section>
        </>
    )
}

export default Booking