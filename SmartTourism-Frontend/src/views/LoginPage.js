import React, { Component } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
  Container,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import loginBackground from "../assets/img/login.jpg";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstFocus: false,
      lastFocus: false,
      login: "",
      password: "",
      rememberMe: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Connexion";
  }

  handleChange(event) {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;

    this.setState({ ...this.state, [input.name]: value });
  }

  formSubmit(event) {
    event.preventDefault();
    this.props.login(
      this.state.login,
      this.state.password,
      this.state.rememberMe
    );
  }

  render() {
    return (
      <React.Fragment>
        <ExamplesNavbar />
        <div className="page-header ">
          <div
            className="page-header-image"
            style={{
              backgroundImage: `url(${loginBackground})`,
            }}
          ></div>
          <div className="content">
            <Container>
              <Col className="mx-auto" md="5">
                <Card
                  className="card-login card-plain  clear-filter"
                  filter-color="blue"
                >
                  <Form action="" className="form" method="">
                    <CardHeader className="text-center">
                      <div className="logo-container">
                        <h2 className="h2 my-5">Smart Hoceima</h2>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (this.state.firstFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08 mr-2"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Login..."
                          type="text"
                          name="login"
                          onFocus={() =>
                            this.setState({ ...this.state, firstFocus: true })
                          }
                          onBlur={() =>
                            this.setState({ ...this.state, firstFocus: false })
                          }
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (this.state.lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_lock-circle-open mr-2" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Mot de passe..."
                          type="password"
                          name="password"
                          onFocus={() =>
                            this.setState({ ...this.state, lastFocus: true })
                          }
                          onBlur={() =>
                            this.setState({ ...this.state, lastFocus: false })
                          }
                          onChange={this.handleChange}
                        ></Input>
                      </InputGroup>
                      <FormGroup check className="text-left">
                        <Label check>
                          <Input
                            type="checkbox"
                            name="rememberMe"
                            onChange={this.handleChange}
                          />
                          <span className="form-check-sign">
                            <span className="check"></span>
                          </span>
                          Se souvenir de moi
                        </Label>
                      </FormGroup>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        onClick={this.formSubmit}
                      >
                        Se connecter
                      </Button>
                      <div className="pull-left">
                        <h6>
                          <a className="link" href="/signup-page">
                            Créer un Compte
                          </a>
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Besoin d'Aide?
                          </a>
                        </h6>
                      </div>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;
