import "./Footer.css"

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer">
                    <div className="left">
                        <img src="/images/logo.png" alt="logo" className="test-0-logo"/>
                        <a href="tel:88001001010" className="phone" className="test-0-phone">
                            8 (800) 100-10-10
                        </a>
                    </div>
                    <div className="right">
                        <nav>
                            <ul>
                                <li>
                                    <div className="header">Navigation</div>
                                </li>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Login</a></li>
                                <li><a href="#">Sign up</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">News</a></li>
                                <li><a href="#">Return</a></li>
                                <li><a href="#">Feedback</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer