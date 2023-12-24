import React from 'react'
import logot from "../logo.jpeg";
import { Link } from "react-router-dom"

export default function Header(props) {
  let Authentic = [];
  Authentic.push(
    <div className='rightcontainer'>
      <button  style={styles.signInButton}>
        Sign In
      </button>
    </div>
  );

  return (
    <header style={styles.container}>
      <div style={styles.logo}>
        <img src={logot} />
      </div>
      <div className='leftcontainer'>
        <Link to='/main' style={styles.link}>Main Information</Link>
      </div>
      {Authentic}
    </header>
  )
}


const styles = {
  container: {
    height: '80px',
    backgroundColor: 'white', // A nice dark background for the header
    color: '#fff', // White text color
    display: 'flex', // Using flexbox for layout
    justifyContent: 'space-between', // Space out left and right containers
    alignItems: 'center', // Center items vertically
    padding: '0 20px', // Some padding on the sides
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // subtle shadow for depth
  },
  logo: {
    height: '60px',
  },
  link: {
    marginRight: '15px', // Space out the navigation links
    color: 'black', // White text color for the links
    textDecoration: 'none', // No underline
    padding: '20px', // Space around the links for a bigger tap/click target
    fontSize: '24px', // Font size for navigation links
    fontWeight: 'bold',
    transition: 'color 0.3s' // Transition for hover effect
  },
  signInButton: {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'black',
    fontSize: '24px',
    color: 'white', // White text
    padding: '10px 55px', // Padding for dimension
    textDecoration: 'none', // Again, no underline
    display: 'inline-flex', // Align the text and image inline
    alignItems: 'center', // Center align the items
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // A slightly darker shadow for contrast
    transition: 'background-color 0.3s, box-shadow 0.3s', // Smooth transitions on hover
    fontWeight: 'bold'
  },
  activeButton: {
    background: '#349EFF',
    color: 'white',
    borderColor: '#349EFF'
  }
};