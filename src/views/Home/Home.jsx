import Header from "../../components/Header/Header";
import "./Home.css"
import Footer from "../../components/Footer/Footer";
const Home = () => {
    return (
        <>
            <Header/>

            <section className="main">
                <div className="left">
                    <h1>We bring cities closer, you live where you want.</h1>
                    <p>Book tickets for your next trip, and get to your destination with ease.</p>

                    <div className="statistics">
                        <div className="stat">
                            <h2 id="destinations">99+</h2>
                            <p>Destinations</p>
                        </div>
                        <div className="split"></div>
                        <div className="stat">
                            <h2 id="partners">30+</h2>
                            <p>Partners</p>
                        </div>
                        <div className="split"></div>
                        <div className="stat">
                            <h2 id="chance">99%</h2>
                            <p>Chance of departure</p>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <img src="/images/main.jpg" alt="main"/>
                </div>
            </section>
            <form className="search-block" action="/search-results" method="GET">
                <h1>Find your dream destination</h1>

                <div className="search">
                    <div className="input">
                        <p>From</p>
                        <input name="from" id="from" className="test-0-fd" required>

                        </input>
                    </div>
                    <div className="input">
                        <p>To</p>
                        <input name="to" id="to" className="test-0-fa" required>

                        </input>
                    </div>
                    <div className="input">
                        <p>Departure date</p>
                        <input type="date" id="departure" name="departure" className="test-0-fdt" required/>
                    </div>
                    <div className="input">
                        <p>Return date</p>
                        <input type="date" id="return" name="return" className="test-0-fat"/>
                    </div>
                    <div className="input">
                        <p>Passengers</p>
                        <input required aria-valuemin={0} aria-valuemax={8} type="number" id="passengers" name="passengers" min="1" max="8" className="test-0-fnp"/>
                    </div>
                </div>
                <button className="search-button test-0-fbs">Search</button>
            </form>
            <section className="promotions-block">
                <h1>
                    Promotions
                </h1>
                <div className="promotions">
                    <div className="promo">
                        <img src="/images/promotions/promotion1.jpg" alt="promo-1" className="test-0-ai"/>
                        <h2 className="test-0-an">Returning and Changing Your Tickets</h2>
                        <p className="test-0-ad">The pandemic has changed many travelers’ plans, but we know that it
                            will not last forever.
                            Once all of this is over, we will continue exploring this world the way we used to.
                            Special rules that have been developed for this challenging situation will help you cancel
                            your trip
                            or postpone it until later.</p>
                        <button className="test-0-abm">Learn more</button>
                    </div>
                    <div className="promo promo-fix">
                        <img src="/images/promotions/promotion2.jpg" alt="promo-2" className="test-0-ai"/>
                        <h2 className="test-0-an">Best offers</h2>
                        <p className="test-0-ad">To see again the streets that witnessed so much. To hug your beloved
                            ones and look back to see
                            what you’ve come through. And to think of new dreams that will be so special!</p>
                        <button className="test-0-abm">Learn more</button>
                    </div>
                    <div className="promo">
                        <img src="/images/promotions/promotion3.jpg" alt="promo-3" className="test-0-ai"/>
                        <h2 className="test-0-an">See you more often</h2>
                        <p className="test-0-ad">Since the beginning of January, we have been expanding the geography of
                            flights in Russia so that you can
                            see your loved ones more often. Choose our company to fly to where you are always
                            expected.</p>
                        <button className="test-0-abm">Learn more</button>
                    </div>
                    <div className="promo">
                        <img src="/images/promotions/promotion4.jpg" alt="promo-4" className="test-0-ai"/>
                        <h2 className="test-0-an">Everything is on again</h2>
                        <p className="test-0-ad">From August 10, we will resume flights to Turkey. Flights from Moscow
                            to Antalya will be operated twice
                            a day daily, and flights on the Moscow-Dalaman route will be operated three to seven times a
                            week.</p>
                        <button className="test-0-abm">Learn more</button>
                    </div>
                </div>
            </section>

            <section className="trust-block">
                <h1>Why trust us?</h1>
                <div className="trust">
                    <div className="trust-item
            ">
                        <h2>Safety</h2>
                        <p>We care about your safety and comfort. Our aircraft are equipped with the latest technology
                            and
                            undergo regular maintenance.</p>
                    </div>
                    <div className="trust-item">
                        <h2>Comfort</h2>
                        <p>We strive to make your flight as comfortable as possible. Our staff will take care of you and
                            make sure you have everything you need.</p>
                    </div>
                    <div className="trust-item">
                        <h2>Reliability</h2>
                        <p>We have been working in the aviation industry for over 20 years. We have a lot of experience
                            and
                            know how to make your flight as smooth as possible.</p>
                    </div>
                </div>
            </section>

            <section className="subscribe-block">
                <h1>Subscribe to our newsletter</h1>
                <p>Subscribe to our newsletter and get the best deals and promotions right to your inbox.</p>
                <form className="subscribe">
                    <input className="test-0-sie" type="email" id="email" name="email" placeholder="Enter your email"/>
                    <button className="subscribe-button test-0-sbs">Subscribe</button>
                </form>
            </section>

            <Footer />
        </>
    )
}

export default Home