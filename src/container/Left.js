import React,{Component} from 'react';
import Flag from "../component/Flag";
import Music from "../component/Music";
import axios from 'axios';

class Left extends Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
      <div className="left">
        <Flag flag={this.props.flagList} flagToBlog={this.props.flagToBlog}></Flag>
        <Music></Music>
      </div>

    )
  }
};

export default Left;
