import React, { useContext, useState } from 'react';
import { useNavigate, useParams, useLoaderData } from 'react-router-dom';
import { mainContext } from '../../context';
import Calendar from 'react-calendar';
// import { obj } from './testUserData';

// console.log(obj)


// Child Components
// import UserCircleDisplay from './UserCirclesDisplay';

const svg = <svg fill="#000000" height="22px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 480.3 480.3" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M254.15,234.1V13.5c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v220.6c-31.3,6.3-55,34-55,67.2s23.7,60.9,55,67.2v98.2 c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-98.2c31.3-6.3,55-34,55-67.2C309.15,268.2,285.55,240.4,254.15,234.1z M240.65,342.8 c-22.9,0-41.5-18.6-41.5-41.5s18.6-41.5,41.5-41.5s41.5,18.6,41.5,41.5S263.55,342.8,240.65,342.8z"></path> <path d="M88.85,120.9V13.5c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v107.4c-31.3,6.3-55,34-55,67.2s23.7,60.9,55,67.2v211.4 c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V255.2c31.3-6.3,55-34,55-67.2S120.15,127.2,88.85,120.9z M75.35,229.6 c-22.9,0-41.5-18.6-41.5-41.5s18.6-41.5,41.5-41.5s41.5,18.6,41.5,41.5S98.15,229.6,75.35,229.6z"></path> <path d="M418.45,120.9V13.5c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v107.4c-31.3,6.3-55,34-55,67.2s23.7,60.9,55,67.2v211.5 c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V255.2c31.3-6.3,55-34,55-67.2S449.85,127.2,418.45,120.9z M404.95,229.6 c-22.9,0-41.5-18.6-41.5-41.5s18.6-41.5,41.5-41.5s41.5,18.6,41.5,41.5S427.85,229.6,404.95,229.6z"></path> </g> </g> </g></svg>

const UserHomePage = () => {
    // data from use loader data
    const mainObjData = useLoaderData();
	const { mainObj, setMainObj } = useContext(mainContext);
    const [newEvent, setNewEvent] = useState('')
    const user = mainObjData.user.username
    // setMainObj(mainObjData)
    const [date, setDate] = useState(new Date());
		
    //////////// User settings page navigation /////////////////

    const navigate = useNavigate();

    const handleSettings = (e) => {
        e.preventDefault();
        return navigate('/user_settings');
    }

    /////////////////////////////////////////////////////////

    const getEventsForDate = (date) => {
        const eventsForDate = [];
        
        Object.values(mainObjData.events).forEach((event) => {
          if (new Date(event.date).toDateString() === date.toDateString()) {
            eventsForDate.push(event);
          }
        });
      
        return eventsForDate;
      };

    // When you clink on this date div
    const onChange = (date) => {
        setDate(date);
        console.log(JSON.stringify(date)) // -> Mon May 22 2023 00:00:00 GMT-0500 (CDT)
        console.log(typeof date)
      };

      const tileContent = ({ date, view }) => {
        if (view === 'month') {
          const now = new Date()
          const events = getEventsForDate(date);
          if (
            date.getYear() === now.getYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate()
          ) {
            // calculate the height (or any other property) based on the current time
            const height = (now.getHours() / 24) * 100;
            return <div style={{ height: `${height}%`, backgroundColor: 'blue' }} />;
          }
          
          if (events.length > 0) {
            return (
              <div>
                {events.map((event, i) => (
                  <p key={i}>{event.name}</p> // You need to have a name property in your events
                ))}
              </div>
            );
          }
        }
      };
    
    //   const tileContent = ({ date, view }) => {
        // if (view === 'month') {
        //   const now = new Date();
        //   // check if the tile date is today
        //   if (
        //     date.getYear() === now.getYear() &&
        //     date.getMonth() === now.getMonth() &&
        //     date.getDate() === now.getDate()
        //   ) {
        //     // calculate the height (or any other property) based on the current time
        //     const height = (now.getHours() / 24) * 100;
        //     return <div style={{ height: `${height}%`, backgroundColor: 'blue' }} />;
        //   }
        // }
        
        // return null;
    //   };

    return (
        <div className="user-home-page">
            {JSON.stringify(mainObj)}
            <div className='settings'>
                <button onClick={handleSettings} className='settings-btn'>{svg}</button>
            </div>
            <div className="user-display">
                <div className='join-trip'>
                    <div className='create-trip'>
                        <Calendar onChange={onChange} value={date} tileContent={tileContent} />
                    </div>
                </div>
                <div className='cirlces'>
                    <h2>Circle</h2>
                    {/* <UserCircleDisplay userObj={ userData } /> */}
                </div>
            </div>
        </div>
    )
}



export default UserHomePage;