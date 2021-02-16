import Head from 'next/head';
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, setHours, setMinutes, getDay, format } from "date-fns";
import axios from 'axios';
import ModalError from '../components/ModalError';
import Nav from '../components/Nav/Nav';

export default function Home() {

  //States
  const [startDate, setStartDate] = useState(new Date());
  const [weekdayCheck, setWeekdayCheck] = useState(false);
  const [currentBookings, setCurrentBookings] = useState();
  const [errorModalFlag, setErrorModalFlag] = useState(false);
  const [bookName, setBookName] = useState('');
  const [screenWidth, setScreenWidth] = useState();
  const [allDay, setAllDay] = useState(false);

  const excludedDateArray = [];

  //State functions
  useEffect(() => {
    //Set width state and adds even listener
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth))

    //Grabs available bookings
    axios.get('/api/read')
      .then(res => {
        setCurrentBookings(res.data);
      }).then(() => {
        if (currentBookings) {
          currentBookings.forEach(item => {
            excludedDateArray.push(new Date(item.booking));
          })
          console.log(excludedDateArray);
        }
      })
  }, [])

  const handleDateChange = (date) => setStartDate(date);

  const enableDisableWeekends = () => setWeekdayCheck(!weekdayCheck);

  const handleBookingButton = () => window.location.replace('/booked');

  const handleNameChange = (e) => setBookName(e.target.value);

  const handleAllDay = () => setAllDay(!allDay);

  //Date Functions
  const isWeekday = (date) => {
    const day = getDay(date);
    if (weekdayCheck) {
      return day !== 0 && day !== 6;
    } else {
      return true;
    }
  };

  //Booking functions
  const handleBook = () => {
    if (bookName !== '') {
      // const formattedDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      const formattedDate = new Date(startDate);
      const today = new Date();
      const bookedOnDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      axios.post('/api/write', {
        booking: formattedDate,
        bookedOn: bookedOnDate,
        name: bookName,
        allDay: allDay
      }).then(res => {
        document.getElementById('nameInput').value = '';
      })
    } else {
      setErrorModalFlag(true);
    }
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

      <Nav />

      {errorModalFlag ? <ModalError handleClose={setErrorModalFlag} /> : <></>}

      <h1 className={styles.header}>Scheduling App</h1>

      <div className={styles.datepicker}>
        <Datepicker
          showTimeSelect={allDay}
          minDate={new Date()}
          inline
          selected={startDate}
          onChange={date => handleDateChange(date)}
          filterDate={isWeekday}
          excludeDates={excludedDateArray}
          showTimeSelect={!allDay}
          minTime={setHours(setMinutes(new Date(), new Date().getMinutes()), new Date().getHours())}
          maxTime={setHours(setMinutes(new Date(), 30), 23)}
        />
      </div>

      <div className={screenWidth > 900 ? "input-group mb-3 w-25" : "input-group mb-3 w-75"}>
        <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
        <input onChange={handleNameChange} id='nameInput' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>

      <div className={styles.toggleDiv}>
        <button onClick={enableDisableWeekends} type="button" className={`btn btn-primary ${styles.optionButton}`}>{weekdayCheck ? "Enable" : "Disable"} Weekends</button>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleAllDay}/>
            <label className="form-check-label" htmlFor="flexCheckDefault" >
            All Day?
          </label>
        </div>
      </div>
      <div className={styles.bottomDiv}>
        <button onClick={handleBook} type="button" className={`btn btn-primary ${styles.optionButton}`}>Book Date</button>
        <button onClick={handleBookingButton} type="button" className={`btn btn-primary ${styles.optionButton}`}>View Booked Dates</button>
      </div>
    </div>
  )
}
