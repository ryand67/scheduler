import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function booked() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        getAndSetBookings();
    }, [])

    const getAndSetBookings = () => {
        axios.get('/api/read')
            .then(res => {
                setBookings(res.data)
            })
    }

    const handleGoHome = () => window.location.replace('/');

    const handleDelete = (id) => {
        axios.delete(`/api/delete?id=${id}`)
        .then(res => {
            console.log(res);
            // getAndSetBookings();
        })
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Scheduling App</title>
                <link rel="icon" href="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap" rel="stylesheet" />
            </Head>

            <h1 className={styles.header}>Booked Dates</h1>
            <button onClick={handleGoHome} type="button" className={`btn btn-primary ${styles.homeButtonBookedPage}`}>Back to Home</button>

            <table className={`table ${styles.tableCSS}`}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Booked Date</th>
                        <th scope="col">Date Booked</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((item, i) => {
                        console.log(item)
                        return (
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{item.booking}</td>
                                <td>{item.bookedOn}</td>
                                <td><button onClick={() => handleDelete(item._id)} type="button" className="btn btn-danger">DELETE</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
