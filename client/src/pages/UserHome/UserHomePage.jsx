import React, { useContext, useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
// import { mainContext } from '../../context';
import { generateEventColors, renderEvents, makeCircleColumn, svg } from './helperFunc';
import Calendar from 'react-calendar';

const UserHomePage = () => {
    // data from use loader data
    const mainObjData = useLoaderData();
	// const { mainObj, setMainObj } = useContext(mainContext);
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

    // State for controlling the popup visibility and selected day
    const [selectedDay, setSelectedDay] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Handle click on a day tile
    const handleDayClick = (value) => {
        setSelectedDay(value);
        setShowPopup(true);
    };

    // When you clink on this date div
    const onChange = (date) => {
        setDate(date);
      };

    
    const circleColors = generateEventColors(mainObjData)
    const events = renderEvents(mainObjData)
    const circleColumn = makeCircleColumn(circleColors)

    console.log(circleColors)


    const tileContent = ({ date, view }) => {
        const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0); // Set time component to 0

        if (view === 'month') {
          const foundEvent = events.find((eventObj) => {
            const eventDate = new Date(eventObj.date);
            return eventDate.getTime() === formattedDate.getTime(); // Compare date objects
          });
          
          let i = 0
          if (foundEvent) {
     
            const circleColor = circleColors[foundEvent.circle];

            return (
              <div id={`event-dot-${i++}`} className={`event-tile ${circleColor}`} style={{ backgroundColor: `${circleColor}` }}>
                {foundEvent.going.length}
                <div className="event-dot" id={`event-dot-${i++}`} style={{ backgroundColor: `${circleColor}` }} />
              </div>
            );
          }
        }

        return null;
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
                    date={selectedDate}
                    onClose={() => setShowPopup(false)}
                />
            )}
            </div>
        </div>
    )
}

export default UserHomePage;