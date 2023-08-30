export const svg = <svg fill="#000000" height="22px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 480.3 480.3" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M254.15,234.1V13.5c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v220.6c-31.3,6.3-55,34-55,67.2s23.7,60.9,55,67.2v98.2 c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-98.2c31.3-6.3,55-34,55-67.2C309.15,268.2,285.55,240.4,254.15,234.1z M240.65,342.8 c-22.9,0-41.5-18.6-41.5-41.5s18.6-41.5,41.5-41.5s41.5,18.6,41.5,41.5S263.55,342.8,240.65,342.8z"></path> <path d="M88.85,120.9V13.5c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v107.4c-31.3,6.3-55,34-55,67.2s23.7,60.9,55,67.2v211.4 c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V255.2c31.3-6.3,55-34,55-67.2S120.15,127.2,88.85,120.9z M75.35,229.6 c-22.9,0-41.5-18.6-41.5-41.5s18.6-41.5,41.5-41.5s41.5,18.6,41.5,41.5S98.15,229.6,75.35,229.6z"></path> <path d="M418.45,120.9V13.5c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v107.4c-31.3,6.3-55,34-55,67.2s23.7,60.9,55,67.2v211.5 c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V255.2c31.3-6.3,55-34,55-67.2S449.85,127.2,418.45,120.9z M404.95,229.6 c-22.9,0-41.5-18.6-41.5-41.5s18.6-41.5,41.5-41.5s41.5,18.6,41.5,41.5S427.85,229.6,404.95,229.6z"></path> </g> </g> </g></svg>

const toCamelCase = (str) => {
    var words = str.split(" ");
    var camelCase = words[0].toLowerCase() + words.slice(1).map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join("");
  
    return camelCase;
  }
  
const colorArr = [
                '#84DCC6',
                '#A5FFD6',
                '#FFA69E',
                '#FF686B',
                '#8F2D56',
                '#0496FF'
                ];

// Generate event colors based on circles
export const generateEventColors = (mainObjData) => {
  const { circles } = mainObjData;
  const colorsArr = []
  const eventColors = {};

  let colorIndex = 0;
  for (let cirKey in circles) {
    if (circles.hasOwnProperty(cirKey)) {
      eventColors[cirKey] = colorArr[colorIndex]
      colorIndex = (colorIndex + 1) % 3; 
      colorsArr.push({circle: cirKey, color: eventColors})
    }
  }

  return eventColors;
};

export const renderEvents = (mainObjData) => {
  const { circles, events } = mainObjData;
  const eventList = [];

  for (let cirKey in circles) {
      if(circles.hasOwnProperty(cirKey)) {
          for (let ev of circles[cirKey].events) {
              let event = toCamelCase(ev)

              const eventData = {
                  circle: cirKey,
                  eventName: ev,
                  going: events[event].attending,
                  date: events[event].date
                  };
              eventList.push(eventData)
              
              }
          }
      }

  return eventList;
  };

export const makeCircleColumn = (circleColors) => {
    const circleColumn = [];
    let key = 0
    for (let circle of Object.keys(circleColors)) {
      circleColumn.push(
        <div className='circle-col-tile' style={{ backgroundColor: `${circleColors[circle]}` }}>
          {circle}
          <div key={`circle-${key++}`} className='col-dot' style={{ backgroundColor: `${circleColors[circle]}` }}></div>
        </div>
      )
    }
    return circleColumn;
  }



export const renderPopupEvent = (_event) => {


  const key = Math.floor(Math.random()* 10000)
  if (_event != undefined) {
    const peopleArr = []
    _event.going.forEach((person) => {
      peopleArr.push(<p>{person}</p>)
    })
    return (
      <div className='popup-info' key={key}>
        <h2>{_event.circle}</h2>
          <ul>
            <li>Going</li>
            {peopleArr}
          </ul>
      </div>
    )
  }
  else {
    return (
      <div>
        Nothing Happening!
      </div>
  )}
  // Else create an event!
}