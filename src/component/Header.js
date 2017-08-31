import React ,{Component}from 'react';
import axios from 'axios';
class Header extends Component{
  reLoad(){
    window.location.reload()
  }

  render(){
    return(
      <div className="head" onClick={this.reLoad.bind(this)}>yi酱屋<a href="https://github.com/sprout-echo">Github For Sprout</a></div>
    )
  }
}

export default Header;
