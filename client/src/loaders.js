import { useNavigate, useParams, json, defer } from 'react-router-dom';
import { obj } from './pages/UserHome/testUserData';


export const userLoader = async ({ params }) => {
    const { id } = params
    try {

        return obj.user
    } catch (err) {
        return new Error('Failed To fetch User Data')
    }
}

export const circleLoader = async ({ params }) => {
    const { trip_id } = params
    try {
        // const res = await fetch('/api/trip/' + trip_id);
        // const trip = await res.json()
       return obj.events
    } catch (err) {
        return null
    }
}

export const mainLoader = async ({ params }) => {
    const { trip_id } = params
    try {
        // const res = await fetch('/api/trip/' + trip_id);
        // const trip = await res.json()
       return obj;
    } catch (err) {
        return null
    }
}