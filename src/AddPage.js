import React from 'react'

import { Input, Icon, Image, Header, Button, Form, Checkbox } from 'semantic-ui-react'
import YouTube from 'react-youtube';
import axios from 'axios'

import { getLanguage, translate } from 'react-multi-lang'
import "./AddPage.css"


// send Battle
// https://io7ey3tcg2.execute-api.eu-west-3.amazonaws.com/default/addBattle

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


class AddPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 

            username:"",
            linkOne: "", 
            idOne:"",
            linkTwo: "", 
            idTwo:"",
            lang: getLanguage(),
            send:true
        };
        

    }
    componentDidMount() {

    }
    
    componentWillUnmount() {
    }
    

    handleOne = (event) => {
        this.setState({linkOne:event.target.value})

        if (event.target.value.split("watch?v=").length > 1){
            this.setState({idOne:event.target.value.split("watch?v=")[1]})
        } else {
            this.setState({idOne:""})
        }
    }
    handleTwo = (event) => { 
        this.setState({linkTwo:event.target.value})

        if (event.target.value.split("watch?v=").length > 1){
            this.setState({idTwo:event.target.value.split("watch?v=")[1]})
        } else {
            this.setState({idTwo:""})
        }
    }
    handleUsername = (event) => { 
        this.setState({username:event.target.value})
    }
    handleSubmit = () => { 
        console.log(this.state.idOne, this.state.idTwo)
        if (this.state.idOne != "" && this.state.idTwo != "") {

            axios.post("https://io7ey3tcg2.execute-api.eu-west-3.amazonaws.com/default/addBattle?idOne="+ this.state.idOne +"&idTwo=" + this.state.idTwo + "&username="+ this.state.username)
            .then(response => {
                console.log(response.data)
                if (response.data.status == "ok"){
                    this.setState({send:true})
                }
            });
        }
    }

    returnHome = () => {
        window.location = "#/"
    }


    render() {

        return (
        <div className="AddPage">
            <div className="banner">
                <img className="returnHome" src={require("./img/home-run.png")} onClick={this.returnHome}/>
                <Header as='h1' color='red'>Ajouter une proposition</Header>
                <div/>

            </div>
            {/* <img src={logoYt} /> */}
            <div className="form">
                <Form size={"big"}>
                    <Form.Field>
                        <label> Auteur </label>
                        <Input 
                            placeholder='username'
                            value={this.state.username}
                            onChange={this.handleUsername}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>1ere video</label>
                        <Input 
                            placeholder='https://'
                            value={this.state.linkOne}
                            onChange={this.handleOne}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>2eme video</label>
                        <Input 
                            placeholder='https://'
                            value={this.state.linkTwo}
                            onChange={this.handleTwo}
                        />
                    </Form.Field>

                    <div className="buttons"> 
                        { this.state.idOne.length > 5 ?
                            <YouTube videoId={this.state.idOne} opts={{height: '330', width: window.innerWidth*0.4}} />
                        :null}
                         { this.state.idTwo.length > 5  ?
                        <YouTube videoId={this.state.idTwo} opts={{height: '330', width: window.innerWidth*0.4}}/>
                        :null}
                    </div>
                    

                    
                    {this.state.send ? <Button positive disabled style={{marginTop:"30px"}}>Envoyé</Button> :
                    <Button type='submit' onClick={this.handleSubmit} style={{marginTop:"30px"}}>Submit</Button>}
                </Form>
            </div>
            


        </div>
        )
    }
}


export default AddPage
