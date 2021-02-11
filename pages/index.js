import Head from 'next/head';
import { useState } from "react";
import styles from '../styles/Home.module.css'
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, setHours, setMinutes, getDay, format } from "date-fns";

export default function Home() {

  const [startDate, setStartDate] = useState(new Date());
  const [weekdayCheck, setWeekdayCheck] = useState(false);
  
  //State functions
  const enableDisableWeekends = () => {
    setWeekdayCheck(!weekdayCheck);
  }

  //Date Functions
  const isWeekday = (date) => {
    const day = getDay(date);
    if(weekdayCheck) {
      return day !== 0 && day !== 6;
    } else {
      return true;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Scheduling App</title>
        <link rel="icon" href="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"></link>
      </Head>

      <h1 className={styles.header}>Scheduling App <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png" className={styles.icon}></img></h1>

      <Datepicker
        minDate={new Date()}
        inline
        selected={startDate}
        onChange={date => setStartDate(date)}
        filterDate={isWeekday}
        // excludeDates={[new Date(), subDays(new Date(), 1)]}
      />
      <button onClick={enableDisableWeekends} type="button" class="btn btn-primary">Disable/Enable Weekends</button>
    </div>
  )
}
