import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Form, Modal, Row, Col, Label, ModalHeader, ModalBody } from "reactstrap";
import Select from 'react-select';
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';

function CommentForm(props) {
    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    const handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    };

    const ratingOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
    ];

    return (
        <div >
            <Button onClick={toggle} variant="outline-secondary" ><span className="fa fa-pencil"></span> Submit Comment</Button>
            <div style={{display: 'block', width: 700, padding: 30}}>
                <Modal
                    isOpen={modal}
                    toggle={toggle}
                >
                    <ModalHeader closeButton>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={2}>
                                    <Label htmlFor="rating">Rating</Label>                             
                                </Col>
                                <Col md={9}>
                                    <Select options={ratingOptions} />
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        </div>
        
    );
}


function DishDetail(props) {

    function renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function formatDate(dateString){
        var date = new Date(dateString);
        var options = {year: 'numeric', month: 'short', day: 'numeric' };

        return date.toLocaleDateString("en-US", options);
    }

    function showSubmitCommentForm() {
        console.log("Try to open modal");
        return (
            <CommentForm />
        );
    }

    function renderComments(comments) {
        const contents = comments.map(comment => {
            return (
                <ul key={comment.id} className="list-unstyled">
                    <li>{comment.comment}</li>
                    <li>-- {comment.author}, {formatDate(comment.date)}</li>
                </ul>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                {contents}
                <CommentForm />
            </div>
        );
    }

    if(props.dish != null)
    {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {renderDish(props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {renderComments(props.comments)}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;