import React from 'react';
import TweetBox from './tweet_box';

class TweetCompose extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: "", 
            newTweet: ""
         }

         this.handleSubmit = this.handleSubmit.bind(this)
    }

  componentWillReceiveProps(nextProps) {
      this.setState({newTweet: nextProps.newTweet.text});
  }


  handleSubmit(e) {
    e.preventDefault();
    let tweet = {
      text: this.state.text
    };

    this.props.composeTweet(tweet); 
    this.setState({text: ''})
    // this.props.history.push('/profile')
  }

 update() {
    return e => this.setState({
      text: e.currentTarget.value
    });
  }



render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                <div>
                    <input type="textarea"
                        value={this.state.text}
                        onChange={this.update()}
                        placeholder="Write your tweet..."
                    />
                    <input type="submit" value="Submit" />
                </div>
            </form>
            <br />
            <TweetBox text={this.state.newTweet} handle={this.props.currentUser.hanlde}/>
        </div>
    )
  }

}
 
export default TweetCompose;