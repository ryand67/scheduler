import React, { useState, useEffect } from 'react'
import styles from './Nav.module.css';
import Link from 'next/link'

export default function Nav() {
    const [location, setLocation] = useState();
    useEffect(() => {
        setLocation(window.location.pathname);
    }, [])
    return (
        <div>
            <Link href={location === '/' ? '/booked' : '/'}>
                <a><img className={styles.nav} src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png" alt=""/></a>
            </Link>
        </div>
    )
}
