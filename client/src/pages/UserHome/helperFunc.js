

export const toCamelCase = (str) => {
    var words = str.split(" ");
    var camelCase = words[0].toLowerCase() + words.slice(1).map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join("");
  
    return camelCase;
  }

  // Generate event colors based on circles
  export const generateEventColors = (mainObjData) => {
    const { circles } = mainObjData;
    const eventColors = {};

    let colorIndex = 0;
    for (let cirKey in circles) {
      if (circles.hasOwnProperty(cirKey)) {
        eventColors[cirKey] = `color${colorIndex}`;
        colorIndex = (colorIndex + 1) % 3; 
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