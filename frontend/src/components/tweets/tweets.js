import React from 'react';
import { withRouter } from 'react-router-dom';
import TweetBox from './tweet_box';

class Tweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            tweets: []
         }
    }

    componentWillMount(){
        this.props.fetchTweets()
    }

    componentWillReceiveProps(newState) {
        this.setState({ tweets: newState.tweets });
    }

    render() { 
        console.log(this.props)
       if(this.state.tweets.length === 0){
           return (<div>No Tweets</div>)
       } else {
           return (
               <div className="tweet-container">
                   <br/>
                   <br/>
                   <br/>
                   <h2 className="home">Home</h2>
                   
                    {this.state.tweets.map(tweet => {
                        return <TweetBox key={tweet._id} text={tweet.text} />
                    })}
               </div>
           )
       }
    }
}
 
export default withRouter(Tweet);