import React from 'react'
import CountUp from 'react-countup';
import { Card, Icon, Image, Header, Button } from 'semantic-ui-react'

import { getLanguage, translate } from 'react-multi-lang'
import axios from 'axios'

import "./HomePage.css"
import 'semantic-ui-css/semantic.min.css'


const one = require('./img/th-masha.jpg');
const two = require('./img/th-reine.jpg');
const logoYt= require('./img/logo.png');
const next = require('./img/refresh.png');
const add = require('./img/more.png');


// color c93a33
// getBattle: https://gik5oo2jc8.execute-api.eu-west-3.amazonaws.com/default


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            width: 0, 
            height: 0, 
            lang: getLanguage(),
            winnerOne: null,
            userBet: false,
            currPlay:0,
            dataList:null
        };
        

    }
    componentDidMount() {


        axios.get("https://gik5oo2jc8.execute-api.eu-west-3.amazonaws.com/default/getBattles")
        .then(response => {
            this.setState({dataList: response.data.body.Items})
            console.log(response.data.body.Items);

            if (parseInt(this.state.dataList[this.state.currPlay].countOne) > parseInt( this.state.dataList[this.state.currPlay].countTwo) ){
                this.setState({winnerOne:true})
                console.log("1 ", parseInt(this.state.dataList[this.state.currPlay].countOne))
            } else {
                this.setState({winnerOne:false})
                console.log("2", parseInt( this.state.dataList[this.state.currPlay].countTwo))
            }
        });
        
    }
    
    componentWillUnmount() {
    }
    


    handleClickOne = () => { 
        this.setState({userBet:true})
    }
    handleClickTwo = () => { 
        this.setState({userBet:true})
    }
    handleNext = () => { 
        if (this.state.currPlay+ 1 == this.state.dataList.length){
            return;
        }
        if (parseInt(this.state.dataList[this.state.currPlay+1].countOne) > parseInt( this.state.dataList[this.state.currPlay+1].countTwo) ){
            this.setState({winnerOne:true})
        } else {
            this.setState({winnerOne:false})
        }
        this.setState({userBet:false, currPlay: this.state.currPlay + 1})

        
    }
    handleAdd = () => { 
        console.log("Add")
        window.location = "#/Add"

    }

    render() {

        if (!this.state.dataList) {
            return (<div></div>)
        }
        if (this.state.dataList.length < this.state.currPlay + 1) {
            this.setState({currPlay:0})
            return (<div>Finish</div>)
        }

        return (
        <div className="mainHomePage">

            <div className="banner">
                <Header as='h1' color='red'>Youtube Views Battle</Header>
            </div>

            <hr className="solid"/>


            <div className="buttons">
                <Header as='h3' color='red'></Header>
                <Header as='h3' color='red'></Header>
                <Header as='h3' color='red'>Score 0/0</Header>
            </div>
            {/* <img src={logoYt} /> */}

            <div className="choice">
            <Card.Group itemsPerRow={2} centered>

                <Card onClick={this.handleClickOne} style={{width:"35%",}}>
                    <Image src={this.state.dataList[this.state.currPlay].urlOne} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.state.dataList[this.state.currPlay].titleOne}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.state.dataList[this.state.currPlay].dateOne}</span>
                        </Card.Meta>
                        <Card.Description>
                        {"Description"}
                        </Card.Description>
                    </Card.Content>
                        
                    {this.state.userBet && 
                    <Card.Content extra>
                        <CountUp className=" count "
                            start={0}
                            end={this.state.dataList[this.state.currPlay].countOne}
                            duration={!this.state.winnerOne ?  1.75 : 2.5}
                            separator=" "    
                        />
                    </Card.Content>
                    }
                </Card>

                <Card  onClick={this.handleClickTwo} style={{width:"35%"}}>
                    <Image src={this.state.dataList[this.state.currPlay].urlTwo} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.state.dataList[this.state.currPlay].titleTwo}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.state.dataList[this.state.currPlay].dateTwo}</span>
                        </Card.Meta>
                        <Card.Description>
                        {"Description"}
                        </Card.Description>
                    </Card.Content>
                        
                    {this.state.userBet && 
                    <Card.Content extra>
                        <CountUp className=" count "
                            start={0}
                            end={this.state.dataList[this.state.currPlay].countTwo}
                            duration={!this.state.winnerOne ? 2.5 : 1.75}
                            separator=" "    
                        />
                    </Card.Content>
                        }
                </Card>
            </Card.Group>
                
            </div>

        <div className="buttons">
            <div />
            <img className="refresh" src={next} onClick={this.handleNext}/>
            <img className="add" src={add} onClick={this.handleAdd}/>
        </div>

        <div className="footer">

        </div>



        </div>
        )
    }
}


export default HomePage
