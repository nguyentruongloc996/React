import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";


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
            </div>
        );
    }

    if(props.dish != null)
    {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {renderDish(props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {renderComments(props.dish.comments)}
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