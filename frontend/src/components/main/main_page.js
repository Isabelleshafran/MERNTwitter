import React from 'react';
import './main.css'

class MainPage extends React.Component {
    render() { 
        return ( 
            <div className="main">
                <img alt="pic" src="twitterlogo.jpg"/>
                <h1>See what’s happening in the world right now</h1>
            </div>
         );
    }
}
 
export default MainPage;