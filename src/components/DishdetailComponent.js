import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Form, Modal } from "reactstrap";
import { Link } from "react-router-dom";


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
                <Form onSubmit={showSubmitCommentForm}>
                    <Button variant="outline-secondary"><span className="fa fa-pencil"></span> Submit Comment</Button>
                </Form>
            </div>
        );
    }

    function showSubmitCommentForm() {
        return (
            <CommentForm />
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

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <></>
        );
    }
}

export default DishDetail;