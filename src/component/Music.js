import React,{Component} from 'react';

class Music extends Component{
    constructor(props){
        super(props)
        this.state = {
            playStatus:true,
            currentTrackIndex:1
        }
    }
    componentDidMount(){
        this.updatePlaystatus;
    }
    musicPlay(){
        this.setState({
            playStatus:!this.state.playStatus
        },()=>{
            this.updatePlaystatus();
        })
    }

    updatePlaystatus(){
        let audio = document.getElementById('audio');
        if(this.state.playStatus){
            audio.play();
            console.log('已经在播放了')
        }else{
            audio.pause();
            console.log('点了暂停了')
        }

    }

    nextMusic(){
        let musiclen = this.props.music.length
        if(this.state.currentTrackIndex +1 >  musiclen){
            this.setState({currentTrackIndex:1})
        }else{
            this.setState({
                currentTrackIndex:++this.state.currentTrackIndex
            },()=>{
                this.updatePlaystatus;
            })
        }
    }

    render(){
        return(
          <div className="music">
            <div id="music-div">
                {this.props.music&&
                    this.props.music.map((item,index)=>{
                        if(item.id == this.state.currentTrackIndex){
                            return <div key={index}>
                                <img src={item.head}/>
                                <div className="music-head">{item.title}</div>
                                <div className="music-btn">
                                    <button onClick={this.musicPlay.bind(this)}><img src="src/img/play.png" /></button>
                                    <button onClick={this.nextMusic.bind(this)}><img src="src/img/next.png"/></button>
                                </div>
                                <audio id="audio" src={item.source}></audio>
                            </div>
                        }

                    })
                }
            </div>
          </div>
        )
    }
};

export default Music;
