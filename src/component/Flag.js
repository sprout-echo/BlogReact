import React,{Component} from 'react';
import axios from 'axios';

class Flag extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="flag">
        <p>标签</p>
        {this.props.flag&&
          this.props.flag.map((item,index)=>{
            return <li key={index} title={item} onClick={this.props.flagToBlog}>{item}</li>
          })
        }
      </div>
    )
  }
}

export default Flag;
