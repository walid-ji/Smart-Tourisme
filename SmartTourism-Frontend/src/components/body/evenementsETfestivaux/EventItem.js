import React, { Component } from "react";
import { Link } from "react-router-dom";
import image from "assets/img/ev.jpg";
import {  Button,Card ,CardBody , CardText ,CardTitle ,CardImg,CardSubtitle} from 'reactstrap';

class EventItem extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            interested: this.props.isUserInterested ? "intéressé" : "s'intéresser",
            checked: this.props.isUserInterested ? "fa fa-check ml-2" : ""
        }
        this.interested = this.interested.bind(this);
    }

    interested() {
        const txt = this.state.interested;
        var interested;

        if (txt === "s'intéresser") {
            this.setState({
                interested: "intéressé",
                checked: "fa fa-check ml-2"
            })
            interested = true;
        }
        if (txt === "intéressé") {
            this.setState({
                interested: "s'intéresser",
                checked: ""
            })
            interested = false;
        }
        this.props.showInterest(this.props.event.id, this.props.userId, interested);
    }


    render() {
        return (
            <Card>
                <Link to={`/events_festivaux/${this.props.event.id}`}  style={{ textDecoration: 'none' }}>
                    <CardImg style={{height:"300px"}} width="100%"  src={this.props.event.eventImage ? this.props.event.eventImage:image } alt={this.props.event.name} />
                    <CardBody>
                        <CardTitle tag="h5" ><strong>{this.props.event.name}</strong></CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.event.localisation}</CardSubtitle>
                        <CardText className="mb-2 text-muted">{new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(new Date(Date.parse(this.props.event.date)))}</CardText>
                    </CardBody>
                </Link>
                {
                    this.props.userRole === "Visitor" ?
                    <Button color="info" type="button" size="sm" onClick={this.interested} >
                        {this.state.interested}<i className={this.state.checked}></i>
                    </Button>
                    : <> </>
                }
            </Card>
        );
    }
}

export default EventItem;