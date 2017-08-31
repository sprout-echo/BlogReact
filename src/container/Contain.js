'use strict';
import React,{Component} from 'react';
import Header from '../component/Header';
import Left from './Left';
import Right from './Right';
import axios from 'axios';

class Contain extends Component{
  constructor(props){
    super(props)
    this.state={
      blogData:[],
      flagList:[]
    }
    this.loadData();
  }

  loadData(){
    axios.get('data/blog.json')
      .then(res=>{
        let flagAll = []
        res.data.data.blog.map((item,index)=>{
          flagAll.push(item.flag)
        })
        let finalFlag = Array.from(new Set(flagAll))

        this.setState({
          blogData:res.data.data.blog,
          flagList:finalFlag
        })
      })
  }

  flagToBlog(e){
    // console.log(e.target.title)
    let flag = e.target.title
    axios.get('data/blog.json')
        .then(res=>{
          let flagData = [];
          res.data.data.blog.map((item,index)=>{
            if(item.flag == flag){
              flagData.push(item)
            }
          })

          this.setState({
            blogData:flagData
          })
        })
  }

  render(){
    return(
      <div>
        <Header></Header>
        <Left flagList={this.state.flagList} flagToBlog={this.flagToBlog.bind(this)}></Left>
        <Right blogData={this.state.blogData}></Right>
        <div className="foot">© 2017-2017 yi酱屋.com</div>
      </div>

    )
  }
}

export default Contain;
