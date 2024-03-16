import "./Header.css"
import {useNavigate} from "react-router-dom";

const Header = () => {
    const nav = useNavigate()
    return (
        <>
            <header>
                <nav>
                    <div className="logo">
                        <img src="/images/logo.png" alt="logo" className="test-0-logo" onClick={() => nav("/")}/>
                    </div>
                    <div className="menu">
                        <ul>
                            <li><a className="test-0-nav-1" href="/">Promotions</a></li>
                            <li><a className="test-0-nav-2" href="/">Search</a></li>
                            <li><a className="test-0-nav-3" href="/">Check In</a></li>
                            <li><a className="test-0-nav-4" onClick={(e) => {
                                e.preventDefault()

                                if (localStorage.getItem("token")) {
                                    nav("/account")
                                } else {
                                    nav("/login")
                                }
                            }}>Personal account</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header