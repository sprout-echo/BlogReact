import React,{Component} from 'react';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
//import "../styles/animate.css";

class Blog extends Component{
  constructor(props){
    super(props)
    this.state = {
      contents:[],            //获取博客的具体内容
      comment:[],             //获取所有评论列表
      nickname:[],           //评论昵称
      discontent:[],         //评论内容
      displayBlog:true
    }
  }
  showContent(id){
    const {blogData} = this.props;
    axios.get('data/blog.json?id='+id)
        .then(res=>{
          let comments = []
          let allid = []
          res.data.data.comment.map((item,index)=>{
            if(item.id == id){
              allid.push(item.id)
            }
          })
          if(allid.length){
            res.data.data.comment.map((item,index)=>{
              if(item.id == id){
                comments.push(item);
              }
            })
          }else{
             comments = []
          }

          this.setState({
            contents:res.data.data.blog[id-1],
            comment:comments,
            displayBlog:false
          })
        });

  }
  hiddenContent(){
    this.setState({
      displayBlog:true
    })
  }
  oploadComment(){
    const {nickname,discontent} = this.state;
    axios.post('manage/php/ajax.php',{nickname:nickname,discontent:discontent})
      .then(res=>{
        console.log(res)
      })
  }

  handleNickName(e){
    this.setState({
      nickname:e.target.value
    })
  }

  handleDisContent(e){
    this.setState({
      discontent:e.target.value
    })
  }
  render(){
    var styleObj = {
      display:this.state.displayBlog ? 'block' :'none'
    }
    var styleObj2 = {
      display:this.state.displayBlog ? 'none' :'block'
    }
    return(
      <div>
        <div className="blogArea" style={styleObj}>
          <ReactCSSTransitionGroup transitionName="blog-animate" transitionEnterTimeout={800} transitionLeaveTimeout={800}>
          {this.props.blogData&&
              this.props.blogData.map((item,index)=>{
                return <div className="blog" key={index} style={{background:'url('+item.cover+') center'}} onClick={this.showContent.bind(this,item.id)}>
                   <div className="detail">
                      <h3>{item.title}</h3>
                      <p><b>[ {item.flag} ] </b> posted - <span>{item.time}</span></p>
                    </div>
               </div>
              })
          }
          </ReactCSSTransitionGroup>
          {!this.props.blogData &&
            <div>暂时还没有博客展示</div>

          }
        </div>
        <div className="content" style={styleObj2}>
          <p className="blog-back" onClick={this.hiddenContent.bind(this)}>博客首页</p>
          <p className="blog-title"><img src="src/img/tit.png"/> {this.state.contents['title']}</p>
          <p><span className="blog-time">创作于{this.state.contents['time']} </span> <span className="blog-flag"> {this.state.contents['flag']}</span></p>
          <div className="blog-content">{this.state.contents['content']}</div>
          <div className="blog-comment">
            <p className="comment-title"><img src="src/img/com.png"/> 尬评</p>
            {this.state.comment&&
              this.state.comment.map((item,index)=>{
                return <div key={index}>
                          <span className="comment-people"><b>客 </b> {item.discuss}:</span>
                          <span>{item.comment}</span>
                        </div>
              })
            }

            <div className="comment-area">
              <form id="commentForm">
                <input type="text" placeholder="请输入昵称(不输入默认是游客)" value={this.state.nickname} onChange={this.handleNickName.bind(this)}/><br/>
                <input type="text" placeholder="请输入评论内容" value={this.state.discontent} onChange={this.handleDisContent.bind(this)}/>
                <input type="button" value="提交" onClick={this.oploadComment.bind(this)}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog;
