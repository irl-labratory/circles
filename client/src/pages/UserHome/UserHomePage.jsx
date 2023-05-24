import React, { useContext, useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
// import { mainContext } from '../../context';
import { generateEventColors, renderEvents, makeCircleColumn, svg } from './helperFunc';

import Popup from './Popup';
import Calendar from 'react-calendar';

const UserHomePage = () => {
    // data from use loader data
    const mainObjData = useLoaderData();
    // setMainObj(mainObjData)
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(new Date());
	
    //////////// User settings page navigation /////////////////

    const navigate = useNavigate();

    const handleSettings = (e) => {
        e.preventDefault();
        return navigate('/user_settings');
    }

    /////////////////////////////////////////////////////////

    // State for controlling the popup visibility and selected day
    const [selectedDay, setSelectedDay] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Handle click on a day tile
    const handleDayClick = (value) => {
        setSelectedDay(value);
        const popUpState = showPopup == true ?  false :  true;
        setShowPopup(popUpState);

        // Find the corresponding event based on the selected date
        const foundEvent = events.find((eventObj) => {
            const eventDate = new Date(eventObj.date);
            return eventDate.getTime() === value.getTime();
            });

        setSelectedEvent(foundEvent);
    };

    // When you clink on this date div
    const onChange = (date) => {
        setDate(date);
      };

    
    const circleColors = generateEventColors(mainObjData)
    const events = renderEvents(mainObjData)
    const circleColumn = makeCircleColumn(circleColors)

    const tileContent = ({ date, view }) => {
        const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0); // Set time component to 0

        if (view === 'month') {
          const foundEvent = events.find((eventObj) => {
            const eventDate = new Date(eventObj.date);
            return eventDate.getTime() === formattedDate.getTime(); // Compare date objects
          });
          
          if (foundEvent) {
     
            const circleColor = circleColors[foundEvent.circle];

            return (
              <div id={`event-dot-${date}`}
                   className={`event-tile ${circleColor}`} 
                   style={{ backgroundColor: `${circleColor}` }}
              >
                {foundEvent.going.length}
              </div>
            );
          }
        }

        return (<div id={`event-dot-${date}`}></div>);
      };
     
    
    return (
        <div className="user-home-page">
            <div className='settings'>
                <button onClick={handleSettings} className='settings-btn'>{svg}</button>
            </div>
            <div className='user-display'>
                <div className='circle-column'>
                    {circleColumn}
                </div>
                <Calendar  onChange={onChange} 
                          value={date} 
                          tileContent={tileContent}
                          onClickDay={handleDayClick}
                                />
                {showPopup && (
                <Popup
                    date={date}
                    onClose={showPopup}
                    setShowPopup={setShowPopup}
                    event={selectedEvent}
                />
                )}
            </div>
        </div>
    )
}

export default UserHomePage;