import React, { Component } from "react";
// reactstrap components
import {
  Button,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import Form from "reactstrap/lib/Form";

// core components
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";

class AddEvent extends Component {
    constructor(props){
      super(props);

      this.state={
        name :'',
        date :'',
        localisation :'',
        description :'',
        private :false,
      }
    }

    changeHandler = (e) =>{
      const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    }
    
    submitHandler = (e) =>{
      e.preventDefault()
      this.props.postEvent(this.state.name, this.state.date, this.state.localisation, this.state.description, this.state.private);
    }

  render(){
    
    return (
      <Container>
        <h2 className="title">Créer un évenement ou festival</h2>
        <p className="description">Remplir ce formulaire.</p>
        <Row> 
        <Col className="text-center ml-auto mr-auto" lg="6" md="8">
        <Form onSubmit={this.submitHandler}>
            <InputGroup>
              <Input
                placeholder="Nom..."
                type="text"
                name="name"
                onChange={this.changeHandler}
              ></Input>
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="Date..."
                type="date"
                name="date"
                onChange={this.changeHandler}
              ></Input>
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="Localisation..."
                type="text"
                name="localisation"
                onChange={this.changeHandler}
              ></Input>
            </InputGroup>
            <div className="textarea-container">
              <Input
                cols="80"
                name="description"
                onChange={this.changeHandler}
                placeholder="Description de l'évenement..."
                rows="100"
                type="textarea"
              ></Input>
            </div>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" name="private" 
                    onChange={this.changeHandler}
                    checked={this.state.private}></Input>
                    <span className="form-check-sign"></span>
                    Accées public
                </Label>
            </FormGroup>
            <div className="send-button">
              <Button
                block
                className="btn-round"
                color="info"
                type="submit"
                size="lg"
              >
                Confirmer
              </Button>
            </div>
          </Form>
          </Col>
        </Row>
      </Container>
);
  }
  
}

export default AddEvent;
