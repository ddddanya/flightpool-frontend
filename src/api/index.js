const searchAirport = async (query) => {
    const req = await fetch("http://localhost:3000/api/airport?query=" + query)
    const res = await req.json()

    return res.data.items
}

const searchFlight = async (from, to, date, date2, passengers) => {
    const req = await fetch(`http://localhost:3000/api/flight?from=${from}&to=${to}&date1=${date}&date2=${date2}&passengers=${passengers}`)
    const res = await req.json()

    return res.data
}

const registration = async (data) => {
    try {
        const req = await fetch("http://localhost:3000/api/registration", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const res = await req.json()

        return {
            status: req.status,
            response: res
        }
    } catch (e) {
        return {
            status: 204
        }
    }
}

const login = async (data) => {
    try {
        const req = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const res = await req.json()

        return {
            status: req.status,
            response: res
        }
    } catch (e) {
        return {
            status: 500
        }
    }
}

const getUser = async () => {
    const req = await fetch(`http://localhost:3000/api/user`, {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    const res = await req.json()

    return res
}

const booking = async (data) => {
    try {
        const req = await fetch("http://localhost:3000/api/booking", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const res = await req.json()

        return {
            status: req.status,
            response: res
        }
    } catch (e) {
        return {
            status: 500
        }
    }
}

export {
    searchAirport,
    searchFlight,
    registration,
    login,
    getUser,
    booking
}