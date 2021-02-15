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
                console.log(res.data)
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

            <table className={`table ${styles.tableCSS}`}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings ? bookings.map((item, i) => {
                        return (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        )
                    }) : <></>}
                </tbody>
            </table>
        </div>
    )
}
