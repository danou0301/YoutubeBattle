import React from 'react'
import CountUp from 'react-countup';
import { Card, Icon, Image, Header, Button } from 'semantic-ui-react'

import { getLanguage, translate } from 'react-multi-lang'
import "./HomePage.css"
import 'semantic-ui-css/semantic.min.css'


const one = require('./img/th-masha.jpg')
const two = require('./img/th-reine.jpg');
const logoYt= require('./img/logo.png');
const next = require('./img/refresh.png');
const add = require('./img/more.png');


// color c93a33

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
            dataOne: {},
            dataTwo: {},
            winnerOne: null,
            userBet: false 
        };
        

    }
    componentDidMount() {
        this.setState({ dataOne: {name:"Masha & Mishka", url:"", count:30*10**9}})
        this.setState({ dataTwo: {name:"DADJU - Reine (Clip Officiel)", url:"", count:27*10**9}})
        if (this.state.dataOne.count > this.state.dataTwo.count) {
            this.setState({winnerOne:true})
        } else {
            this.setState({winnerOne:false})
        }

    }
    
    componentWillUnmount() {
    }
    


    handleClickOne = () => { 
        console.log("click one")
        this.setState({userBet:true})
    }
    handleClickTwo = () => { 
        console.log("click two")
        this.setState({userBet:true})
    }
    handleNext = () => { 
        this.setState({userBet:false})
    }
    handleAdd = () => { 
        console.log("Add")
        window.location = "#/Add"

    }

    render() {

        return (
        <div className="mainHomePage">

            <div className="banner">
                <Header as='h1' color='red'>Youtube Views Battle</Header>
            </div>

            <hr className="solid"/>


            <div className="buttons">
                <Header as='h3' right color='red'></Header>
                <Header as='h3' right color='red'></Header>
                <Header as='h2' right color='red'>Score 0/0</Header>

            </div>
            {/* <img src={logoYt} /> */}

            <div className="choice">
            <Card.Group itemsPerRow={2} centered>

                <Card onClick={this.handleClickOne} style={{width:"42%"}}>
                    <Image src={one} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.state.dataOne.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>2015</span>
                        </Card.Meta>
                        <Card.Description>
                        {"Description"}
                        </Card.Description>
                    </Card.Content>
                        
                    {this.state.userBet && 
                    <Card.Content extra>
                        <CountUp className=" count "
                            start={0}
                            end={this.state.dataOne.count}
                            duration={!this.state.winnerOne ? 2.5 : 1.75}
                            separator=" "    
                        />
                    </Card.Content>
                    }
                </Card>

                <Card  onClick={this.handleClickTwo} style={{width:"42%"}}>
                    <Image src={two} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.state.dataTwo.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>2019</span>
                        </Card.Meta>
                        <Card.Description>
                        {"Description"}
                        </Card.Description>
                    </Card.Content>
                        
                    {this.state.userBet && 
                    <Card.Content extra>
                        <CountUp className=" count "
                            start={0}
                            end={this.state.dataTwo.count}
                            duration={!this.state.winnerOne ? 1.75 : 2.5}
                            separator=" "    
                        />
                    </Card.Content>
                        }
                </Card>
            </Card.Group>
                
            </div>

        <div className="buttons">
            <img className="none" src={add} />
            <img className="refresh" src={next} onClick={this.handleNext}/>
            <img className="add" src={add} onClick={this.handleAdd}/>
        </div>



        </div>
        )
    }
}


export default HomePage
