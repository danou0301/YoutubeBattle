import React from 'react'

import { Input, Icon, Image, Header, Button, Form, Checkbox } from 'semantic-ui-react'
import YouTube from 'react-youtube';

import { getLanguage, translate } from 'react-multi-lang'
import "./AddPage.css"



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


class AddPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 

            linkOne: "", 
            idOne:"",
            linkTwo: "", 
            idTwo:"",
            lang: getLanguage(),
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
    handleSubmit = () => { 
        console.log(this.state.idOne, this.state.idTwo)
        if (this.state.idOne != "" && this.state.idTwo != ""){
            // send the new battle
        }
    }


    render() {

        return (
        <div className="AddPage">
            <div className="banner">
                <Header as='h1' color='red'>Ajouter une proposition</Header>
            </div>
            {/* <img src={logoYt} /> */}
            <div className="form">
                <Form size={"big"}>
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
                    

                    
                    <Button type='submit' onClick={this.handleSubmit} style={{marginTop:"30px"}}>Submit</Button>
                </Form>
            </div>
            


        </div>
        )
    }
}


export default AddPage
