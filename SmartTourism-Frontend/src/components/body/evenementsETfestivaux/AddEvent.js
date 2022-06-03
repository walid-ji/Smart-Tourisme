import React, { Component } from "react";
// reactstrap components
import { Button, Input, InputGroup, Container, Row, Col } from "reactstrap";
import Form from "reactstrap/lib/Form";
import { SubmitImage } from "../../../shared/Cloudinary";
import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
} from "../../../shared/Cloudinary";
// core components
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import axios from "axios";
import background from "../../../assets/img/eva.jpg";
class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      date: "",
      localisation: "",
      description: "",
      image: "",
      imagePreview: "",
      private: false,
    };
  }

  handleChangeImage = (event) => {
    const file = event.target.files[0];
    this.setState({ image: file ,imagePreview : URL.createObjectURL(file) });
  };

  changeHandler = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    if (this.state.image == "") {
      this.props.postEvent(
        this.state.name,
        this.state.date,
        this.state.localisation,
        this.state.description,
        this.state.private,
        null
      );
    } else {
     SubmitImage(this.state.image)
     .then((res) =>
        this.props.postEvent(
          this.state.name,
          this.state.date,
          this.state.localisation,
          this.state.description,
          this.state.private,
          res.data.secure_url
        )
      );
    }
  };



  render() {
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
              <div className="textarea-container">
                <Input
                  type="file"
                  id="files"
                  multiple
                  name="files"
                  onChange={this.handleChangeImage}
                ></Input>
              </div>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="private"
                    onChange={this.changeHandler}
                    checked={this.state.private}
                  ></Input>
                  <span className="form-check-sign"></span>
                  Accées public
                </Label>
                <img
                  src={this.state.image === "" ? background : this.state.imagePreview}
                  style={{display : this.state.image === ""? "none":"block"}}
                  alt="walid"
                ></img>
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
