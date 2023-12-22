import React from 'react'

import {Link} from "react-router-dom"

export default function Header(props) {
  let Authentic = [];
  if (props.isLogged === 1) {
    Authentic.push(
      <div className='rightcontainer'><Link to='/profile' style={styles.link}>
        Profile
      </Link></div>
    );
  } else {
    Authentic.push(
      <div className='rightcontainer'>
        <Link to='/signinto' style={styles.signInButton}>
          <span>Sign In</span>
        </Link>
      </div>
    );
  }

  return (
    <header style={styles.container}>
      <div>
        <Link to='/' style={styles.logo}>sofTTech</Link>
      </div>
      <div className='leftcontainer'>
        <Link to='/test' style={styles.link}>Create Test</Link>
        
        { !props.isLogged && <Link to='/signinto' style={styles.link}>Login</Link> }
      </div>
      {Authentic}
    </header>
  )
}


const styles = {
  container: {
    backgroundColor: '#333', // A nice dark background for the header
    color: '#fff', // White text color
    display: 'flex', // Using flexbox for layout
    justifyContent: 'space-between', // Space out left and right containers
    alignItems: 'center', // Center items vertically
    padding: '0 20px', // Some padding on the sides
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // subtle shadow for depth
  },
  logo: {
    fontWeight: 'bold', // Bold font for logo
    fontSize: '1.5rem', // Larger font size for the logo
    color: '#61dafb', // Use React's logo color for some flair
    textDecoration: 'none', // Remove underline from logo link
    padding: '10px 0' // Some padding to increase tap target on mobile
  },
  link: {
    marginRight: '15px', // Space out the navigation links
    color: '#fff', // White text color for the links
    textDecoration: 'none', // No underline
    padding: '10px', // Space around the links for a bigger tap/click target
    fontSize: '1rem', // Font size for navigation links
    fontWeight: 'normal',
    transition: 'color 0.3s' // Transition for hover effect
  },
  signInButton: {
    backgroundColor: '#5C47E0', // A pleasant purple for the sign in button
    color: '#fff', // White text
    padding: '10px 15px', // Padding for dimension
    borderRadius: '5px', // Rounded corners
    textDecoration: 'none', // Again, no underline
    display: 'inline-flex', // Align the text and image inline
    alignItems: 'center', // Center align the items
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // A slightly darker shadow for contrast
    transition: 'background-color 0.3s, box-shadow 0.3s' // Smooth transitions on hover
  },
  signInImage: {
    marginLeft: '10px', // Space out text and image
    height: '20px', // Specify image size to make sure it's not too big
    width: '20px' // Maintain aspect ratio but you can ignore it if your image is SVG
  }
};
