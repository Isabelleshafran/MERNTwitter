import React from 'react';
import TweetBox from '../tweets/tweet_box';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        
          this.state = {
            tweets: []
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.props.fetchUserTweets(this.props.currentUser.id);
   
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.path !== this.props.match.path) {
            this.props.fetchUserTweets(this.props.currentUser.id);
        }
    }

    componentWillReceiveProps(newState) {
        this.setState({ tweets: newState.tweets });
    }  

    render() {
        if (this.state.tweets.length === 0) {
          
          return (
            <div>
               <br/>
                  <br/>
                  <br/>
                <br/>
                  <br/>
                  <br/>
              <div>No Tweets!</div>
            </div>
              
          )
        } else {
          return (
            <div className="tweet-container">
              <br/>
              <br/>
              <br/>
              
              <h2>{this.props.currentUser.handle}'s tweets</h2>
              {this.state.tweets.map(tweet => (
                <TweetBox key={tweet._id} text={tweet.text} handle={this.props.currentUser.handle}/>
              ))}
            </div>
          );
        }
      }  
}
 
export default Profile;