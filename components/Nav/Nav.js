import React, { useState, useEffect } from 'react'
import styles from './Nav.module.css';

export default function Nav() {
    const [location, setLocation] = useState();
    useEffect(() => {
        setLocation(window.location.pathname);
    }, [])
    return (
        <div>
            <a href={location === '/' ? '/booked' : '/'}><img className={styles.nav} src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png" alt=""/></a>
        </div>
    )
}
