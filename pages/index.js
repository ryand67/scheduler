import Head from 'next/head';
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, setHours, setMinutes, getDay, format } from "date-fns";
import axios from 'axios';

export default function Home() {

  const [startDate, setStartDate] = useState(new Date());
  const [weekdayCheck, setWeekdayCheck] = useState(false);
  const [currentBookings, setCurrentBookings] = useState();

  const excludedDateArray = [];
  
  //State functions
  useEffect(() => {
    axios.get('/api/read')
    .then(res => {
      setCurrentBookings(res.data);
    }).then(() => {
      if(currentBookings) {
        currentBookings.forEach(item => {
          excludedDateArray.push(new Date(item.booking));
        })
        console.log(excludedDateArray);
      }
    })
  }, [])

  const handleDateChange = (date) => {
    setStartDate(date);
  }

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

  //Booking functions
  const handleBook = () => {
    const formattedDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    axios.post('/api/write', {
      booking: formattedDate
    }).then(res => {
      console.log(res);
    })
  }

  const getBookings = () => {
    axios.get('/api/read')
    .then(res => {
      console.log(res);
    })
    console.log(startDate.getDate());
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Scheduling App</title>
        <link rel="icon" href="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous"></link>
      </Head>

      <h1 className={styles.header}>Scheduling App <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png" className={styles.icon}></img></h1>

    <div className={styles.datepicker}>
      <Datepicker
        minDate={new Date()}
        inline
        selected={startDate}
        onChange={date => handleDateChange(date)}
        filterDate={isWeekday}
        excludeDates={excludedDateArray}
      />
    </div>
    <div className={styles.toggleDiv}>
      <button onClick={enableDisableWeekends} type="button" className={`btn btn-primary ${styles.optionButton}`}>{weekdayCheck ? "Enable" : "Disable"} Weekends</button>
    </div>
    <div className={styles.bottomDiv}>
      <button onClick={handleBook} type="button" className={`btn btn-primary ${styles.optionButton}`}>Book Date</button>
      <button onClick={getBookings} type="button" className={`btn btn-primary ${styles.optionButton}`}>View Booked Dates</button>
    </div>
    </div>
  )
}
