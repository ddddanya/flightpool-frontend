import "./Account.css"
import Header from "../../components/Header/Header";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser} from "../../api";

const Account = () => {
    const nav = useNavigate()

    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            nav("/login")
        } else {
            async function fetchData() {
                const data = await getUser()
                console.log(data)
                setUserData(data)
            }

            fetchData()
        }
    }, [])
    return (
        <>
            <Header />

            <section className="profile">
                <h1>Personal account</h1>

                <div className="user-info">
                    <div className="user">
                        <img src="/images/airline-staff-never-fat-British-Airways-711420.jpg" alt="user"/>
                        <div className="info">
                            <div className="name">{userData.first_name} {userData.last_name}</div>
                            <div className="num">4 flights</div>
                        </div>
                    </div>

                    <button className="test-0-fb" onClick={() => {
                        localStorage.removeItem("token")
                        nav("/login")
                    }}>Logout</button>
                </div>

                {/*<h2>Upcoming reservations</h2>*/}

                {/*<div className="reservations">*/}
                {/*    <div className="reservation">*/}
                {/*        <div className="number">GV123</div>*/}
                {/*        <div className="flight">*/}
                {/*            <div className="from">Almaty</div>*/}
                {/*            <div className="to">Astana</div>*/}
                {/*        </div>*/}
                {/*        <div className="date">2021-12-12</div>*/}
                {/*        <div className="time">12:00</div>*/}
                {/*    </div>*/}
                {/*    <div className="reservation">*/}
                {/*        <div className="number">GV123</div>*/}
                {/*        <div className="flight">*/}
                {/*            <div className="from">Astana</div>*/}
                {/*            <div className="to">Almaty</div>*/}
                {/*        </div>*/}
                {/*        <div className="date">2021-12-12</div>*/}
                {/*        <div className="time">12:00</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </section>
        </>
    )
}

export default Account