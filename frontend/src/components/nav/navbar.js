
import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
      this.props.history.push('/')
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="Links1">
                <Link to={'/tweets'}>All Tweets</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/new_tweet'}>Write a Tweet</Link>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div className="Links2"> 
                <Link to={'/signup'}>Create Account</Link>
                <Link to={'/login'}>Log in</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div className="NavBar">
          <div className="Links">
            { this.getLinks() }
          </div>
        </div>
      );
  }
}

export default NavBar;