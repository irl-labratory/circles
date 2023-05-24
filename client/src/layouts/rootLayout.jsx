// import React from "react";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";

const RootLayout = () => {
  
  // pass in trip obj
  // const [currentTrip, setCurrentTrip] = useState(null);
	// const user = useLoaderData();
	// const id = user._id;
	// console.log('user: ', user)

  return (
    <div className="root-layout">
      <header>
        <nav id='main-nav'>
          <NavLink to='/' className='nav-link'> Login </NavLink>
          <NavLink to='/loading'className='nav-link'> Loading </NavLink>
          <NavLink to='/home_page/' className='nav-link'> Home </NavLink>
          <NavLink to='/user_settings'className='nav-link'> User-Settings </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
};

export default RootLayout;