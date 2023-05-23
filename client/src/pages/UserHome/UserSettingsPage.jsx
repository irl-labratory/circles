import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate, Form, Navigate } from 'react-router-dom';
import { userContext } from '../../context.js';
// import './UserSettingsPage.scss'

const UserSettingsPage = () => {

    const { user, setUser } = useContext(userContext);

    const [newUserName, setNewUsername] = useState(user.username);
    const [newPassword, setNewPassword] = useState(user.password);
    const [newCirclesArr, setNewCirclesArr] = useState([])
    
    const navigate = useNavigate()

    // function to handle updates to the usernam or password
    function handleSubmit(e) {
        e.preventDefault()
        window.alert('Account information has been updated.')
        // update the user state with the new information
        setUser({ username: newUserName, password: newPassword, circles: newCircleArr})
    }
    
    // function to delete a trip from a users trip
    function deleteTrip(e) {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            // filter the array to remove the element that was clicked on
            const updatedCircles = newCirclesArr.filter(trip => trip.name !== e.target.value)
            // update the circle array state
            setNewCirclesArr([...updatedCircles])
            // update the user state with the new information
            setUser({...user, circles: [...updatedCircles]})
        } else {
            return
        }
    }

    // function to delete users account
    function handleDelete() {
        if (window.confirm('Are you sure you want to delete your account?')) {
            // DELETE FETCH REQUEST WITH USER INFORMATION
            // fetch('/user/:_id', {
            //     method: 'DELETE'
            // })
            // <Navigate to={'/signup'} />
        } else {
            return 
        }
    }

    function handleSave() {
        window.alert('Changes have been saved.')
        console.log('updated account info to be sent back', user)
        // fetch('/users/:_id', {
        //     method: 'POST', // possibly PUT?
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: { user }
        // })
        // .then(data => data.json())
        // .then(response => {
        //     console.log(response)
                navigate(`/${user._id}`)
        // })
        // .catch(error => console.log('Error, ', error))
    }


    return (
        <main className='settings-page'>
            <div className='user-settings'>
                <div className="update-username">
                    {/* button to check state... used for testing */}
                    {/* <button onClick={logState}>Log State</button> */}
                    <h2>Update Username</h2>
                    <input type='text' placeholder='new username' onChange={(e) => setNewUsername(e.target.value)}/>
                    <button className='username-update' onClick={handleSubmit}>update username</button>
                </div>
                <div className="update-password">
                    <h2>Update Password</h2>
                    <input type='text' placeholder='new password' onChange={(e) => setNewPassword(e.target.value)}/>
                    <button className='password-update' onClick={handleSubmit}>update password</button>
                </div>
                <h2 className='trip-title'>Circles</h2>
                <div className="update-circles">
                    <div className="trip-log">
                        {newCirclesArr.map((trip, i) => <button key={i} id={i} value={trip.name} className='trip' onClick={deleteTrip}>{trip.date} - {trip.name}</button>)}
                    </div>
                </div>
                <div className="save-account">
                    <button className='save-changes' onClick={handleSave}>Save Changes</button>
                </div>
                <div className="delete-account">
                    <h2>Delete Account</h2>
                    <button className='user-update' onClick={handleDelete}>delete account</button>
                </div>
            </div>
        </main>
    )
}

export default UserSettingsPage;