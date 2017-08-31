import React,{Component} from 'react';
import Blog from '../component/Blog';



class Right extends Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="right">
        <Blog blogData={this.props.blogData}></Blog>
      </div>
    )
  }
};

export default Right;
