import "./SearchResults.css"
import Header from "../../components/Header/Header";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {searchAirport, searchFlight} from "../../api";
import {calculateTimeDifference} from "../../utils/calculateTimeDifference";

const SearchResults = () => {
    const nav = useNavigate()

    const [query] = useSearchParams()

    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [depDate, setDepDate] = useState()
    const [retDate, setRetDate] = useState()
    const [passengers, setPassengers] = useState()

    const [sortSelected, setSortSelected] = useState("fastest")

    const [results, setResults] = useState({
        flights_to: [],
        flights_back: []
    })

    useEffect(() => {
        const from = query.get("from")
        const to = query.get("to")
        const dep = query.get("departure")
        const ret = query.get("return")
        const passengers = query.get("passengers")

        setFrom("Loading...")
        setTo("Loading...")
        setDepDate(dep)
        setRetDate(ret)
        setPassengers(passengers)
    }, [query])

    useEffect(() => {
        if (from == "Loading..." && to == "Loading...") {
            airportSearch()
        }
    }, [to, from])

    useEffect(() => {
        if (sortSelected == "fastest") {
            setResults({
                flights_to: results.flights_to.sort((a, b) => {
                    return calculateTimeDifference(a.from.time, a.to.time).minutes - calculateTimeDifference(b.from.time, b.to.time).minutes
                }),
                flights_back: results.flights_back.sort((a, b) => {
                    return calculateTimeDifference(a.from.time, a.to.time).minutes - calculateTimeDifference(b.from.time, b.to.time).minutes
                })
            })
        }
        if (sortSelected == "cheapest") {
            setResults({
                flights_to: results.flights_to.sort((a, b) => {
                    return a.cost - b.cost
                }),
                flights_back: results.flights_back.sort((a, b) => {
                    return a.cost - b.cost
                })
            })
        }
    }, [sortSelected])

    const airportSearch = async () => {
        const res = await searchAirport(query.get("from"))
        if (!res[0]) {
            nav("/")
        }

        setFrom(res[0].iata)

        const res2 = await searchAirport(query.get("to"))
        if (!res2[0]) {
            nav("/")
        }

        setTo(res2[0].iata)

        search(res[0].iata, res2[0].iata)
    }

    const search = async (from, to) => {
        const res = await searchFlight(from, to, depDate, retDate, passengers)
        setResults(res)
    }

    return (
        <>
            <Header />
            <form className="search-block2">
                <h1>Search results</h1>

                <div className="search">
                    <div className="input">
                        <p>From</p>
                        <input disabled name="from" id="from" className="test-0-fd" value={from}>
                        </input>
                    </div>
                    <div className="input">
                        <p>To</p>
                        <input disabled name="to" id="to" className="test-0-fa" value={to}>
                        </input>
                    </div>
                    <div className="input">
                        <p>Departure date</p>
                        <input disabled type="date" id="departure" name="departure" className="test-0-fdt" value={depDate}/>
                    </div>
                    <div className="input">
                        <p>Return date</p>
                        <input disabled type="date" id="return" name="return" className="test-0-fat" value={retDate}/>
                    </div>
                    <div className="input">
                        <p>Passengers</p>
                        <input disabled type="number" id="passengers" name="passengers" min="1" max="8"
                               className="test-0-fnp" value={passengers}/>
                    </div>
                </div>
            </form>

            <div className="sort">
                <div className={`item ${sortSelected == "fastest" && "selected"}`} onClick={() => setSortSelected("fastest")}>
                    Fastest
                </div>
                <div className={`item ${sortSelected == "cheapest" && "selected"}`} onClick={() => setSortSelected("cheapest")}>
                    Cheapest
                </div>
            </div>
            <section className="results">
                {results.flights_to.length < 1 && <h3>Loading...</h3>}
                {results.flights_to.length > 0 && <h3>Flights to</h3>}
                {results.flights_to.map((item) => {
                    return (
                        <div className="item">
                            <div className="main-content">
                                <div className="info">
                                    <div className="left">
                                        <div className="flight-number test-4-fn">
                                            {item.flight_code}
                                        </div>
                                        <div className="route">
                                            {item.from.city} - {item.to.city}
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="airports">
                                            {item.from.airport} ({item.from.iata}) - {item.to.airport} ({item.to.iata})
                                        </div>
                                        <div className="date test-4-dd test-4-dt test-4-at test-4-ft">
                                            {item.from.time} - {item.to.time}
                                        </div>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="price test-4-fp">
                                        {item.cost}$
                                    </div>
                                    <div className="book test-4-bsb" onClick={() => {
                                        window.open(`/booking?id=${item.flight_id}&cost=${item.cost}&date=${item.from.date}&passengers=${passengers}&airport_from=${item.from.airport}&airport_to=${item.to.airport}&flight_number=${item.flight_code}&city_from=${item.from.city}&city_to=${item.to.city}&time_from=${item.from.time}&time_to=${item.to.time}`)
                                    }}>
                                        Select
                                    </div>
                                </div>
                            </div>
                            <div className="additional-content">
                                <div className="airplane">
                                    <img src="/images/clouds/cloud_064.png"/>
                                    <div className="info">
                                        <div className="label">
                                            Time in flight
                                        </div>
                                        <div className="value">
                                            {calculateTimeDifference(item.from.time, item.to.time).result}
                                        </div>
                                    </div>
                                </div>
                                <div className="airplane">
                                    <img src="/images/aircrafts/commercial_airline_main.png"/>
                                    <div className="info">
                                        <div className="label">
                                            Aircraft
                                        </div>
                                        <div className="value test-4-at">
                                            Airbus A320
                                        </div>
                                    </div>
                                </div>
                                <div className="chance">
                                    <div className="circle green"></div>
                                    <div className="info">
                                        <div className="label">
                                            Departure chance
                                        </div>
                                        <div className="value test-4-fh">
                                            90%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {results.flights_back.length > 0 && <h3>Flights back</h3>}
                {results.flights_back.map((item) => {
                    return (
                        <div className="item">
                            <div className="main-content">
                                <div className="info">
                                    <div className="left">
                                        <div className="flight-number test-4-fn">
                                            {item.flight_code}
                                        </div>
                                        <div className="route">
                                            {item.from.city} - {item.to.city}
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="airports">
                                            {item.from.airport} ({item.from.iata}) - {item.to.airport} ({item.to.iata})
                                        </div>
                                        <div className="date test-4-dd test-4-dt test-4-at test-4-ft">
                                            {item.from.time} - {item.to.time}
                                        </div>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="price test-4-fp">
                                        {item.cost}$
                                    </div>
                                    <div className="book test-4-bsb" onClick={() => {
                                        window.open("/booking?id=" + item.flight_id + "&date=" + item.from.date, "_blank")
                                    }}>
                                        Select
                                    </div>
                                </div>
                            </div>
                            <div className="additional-content">
                                <div className="airplane">
                                    <img src="/images/clouds/cloud_064.png"/>
                                    <div className="info">
                                        <div className="label">
                                            Time in flight
                                        </div>
                                        <div className="value">
                                            {calculateTimeDifference(item.from.time, item.to.time).result}
                                        </div>
                                    </div>
                                </div>
                                <div className="airplane">
                                    <img src="/images/aircrafts/commercial_airline_main.png"/>
                                    <div className="info">
                                        <div className="label">
                                            Aircraft
                                        </div>
                                        <div className="value test-4-at">
                                            Airbus A320
                                        </div>
                                    </div>
                                </div>
                                <div className="chance">
                                    <div className="circle green"></div>
                                    <div className="info">
                                        <div className="label">
                                            Departure chance
                                        </div>
                                        <div className="value test-4-fh">
                                            90%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default SearchResults