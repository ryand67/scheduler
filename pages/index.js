import Head from 'next/head';
import { useState } from "react";
import styles from '../styles/Home.module.css'
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, setHours, setMinutes, getDay, format } from "date-fns";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <Head>
        <title>Scheduling App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Datepicker
        minDate={new Date()}
        inline
        selected={startDate}
        onChange={date => setStartDate(date)}
      />
    </div>
  )
}
