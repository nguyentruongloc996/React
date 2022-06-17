import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, Row, Col, Label, ModalHeader, ModalBody } from "reactstrap";
import Select from 'react-select';
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import "bootstrap/dist/css/bootstrap.min.css"
import {Loading} from './LoadingComponent'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function CommentForm(props) {
    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    const handleSubmit = (values) => {
        toggle();
        props.addComment(props.dishId, values.rating, values.author, values.comment);
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
                    <ModalHeader toggle={toggle}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>                         
                                <Col md={12}>
                                    <Select model='.rating' 
                                    options={ratingOptions} 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>                         
                                <Col md={12}>
                                    <Control.text 
                                        model='.author'
                                        id="author"
                                        name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>                         
                                <Col md={12}>
                                    <Control.textarea 
                                        model='.comment'
                                        id="comment"
                                        name="comment"
                                        className="form-control"
                                        rows={6}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                            <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        </div>
        
    );
}

function formatDate(dateString){
    var date = new Date(dateString);
    var options = {year: 'numeric', month: 'short', day: 'numeric' };

    return date.toLocaleDateString("en-US", options);
}

function RenderComments({comments, dishId, addComment}) {
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
            <CommentForm dishId={dishId} addComment={addComment}/>
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

    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish != null)
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
                        <RenderComments 
                            comments={props.comments} 
                            dishId={props.dish.id}
                            addComment={props.addComment}
                        />
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