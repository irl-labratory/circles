import { useState, useContext } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { mainContext, userContext } from './context.js';

// Import styles
import './styles/index.scss';

// Pages to render
import LoginPage from './pages/LoginPage.jsx';
import UserHomePage from './pages/UserHome/UserHomePage.jsx';
import UserSettingsPage from './pages/UserHome/UserSettingsPage.jsx';
import RootLayout from './layouts/rootLayout';

// Loader functions
import { userLoader, mainLoader, circleLoader } from './loaders.js';

// ROUTE PROVIDER Component to 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<LoginPage key='login'/>} />
      <Route
        path=':id'
        loader={mainLoader}
        element={<UserHomePage key='user' />}
      />
      <Route
        path='/user_settings/'
        element={<UserSettingsPage key='user_settings' />}
      />
    </Route>
  )
)
const App = () => {

  const [ user, setUser ] = useState('null');
  const [ currentTrip, setCurrentTrip ] = useState(null);
  const userValue = { user, setUser }
  const currentTripValue = {currentTrip, setCurrentTrip}


  return (
    <userContext.Provider value={userValue}>
      <mainContext.Provider value={currentTripValue}>
        <RouterProvider router={router} />
      </mainContext.Provider>
    </userContext.Provider>
  )
}

export default App;