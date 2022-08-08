import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import Contact from './ContactComponent';
import Header from "./HeaderComponent";
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchComments, fetchDishes, fetchPromos } from '../redux/ActionCreater';
import { useEffect } from 'react';
import { actions } from 'react-redux-form';

// Map Redux Store states into Component props
const mapStateToProps = state => {
    return {
        mappedDishes: state.dishes,
        mappedComments: state.comments,
        mappedPromotions: state.promotions,
        mappedLeaders: state.leaders
    }
};

// addComment function return an Action
// then dispatch receive that Action as parameter to send it to store
const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comments) => dispatch(postComment(dishId, rating, author, comments)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
});

function Main(props) {

    useEffect(() => {
        props.fetchDishes();
        props.fetchComments();
        props.fetchPromos();
    }, []);

    function getHomePage()
    {
        return (
            <Home 
                dish={props.mappedDishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={props.mappedDishes.isLoading}
                dishesErrMess={props.mappedDishes.errMess}
                promotion={props.mappedPromotions.promotions.filter((promo) => promo.featured)[0]}
                promosLoading={props.mappedPromotions.isLoading}
                promosErrMess={props.mappedPromotions.errMess}
                leader={props.mappedLeaders.filter((leader) => leader.featured)[0]}
            />
        );
    }

    function DishWithId() {
        const params = useParams();
        return (
            <DishDetail 
                dish={props.mappedDishes.dishes.filter(dish => dish.id === parseInt(params.dishId,10))[0]}
                isLoading={props.mappedDishes.isLoading}
                errMess={props.mappedDishes.errMess}
                comments={props.mappedComments.comments.filter((comment) => comment.dishId === parseInt(params.dishId,10))}
                commentsErrMess={props.mappedComments.errMess}
                postComment={props.postComment}
            />
        );
    }

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/home" element={
                    getHomePage()
                } />
                <Route exact path="/menu" element={<Menu dishes={props.mappedDishes} />} />
                <Route path="/menu/:dishId" element={<DishWithId />}/>
                <Route path="/contactus" element={<Contact resetFeedbackForm={props.resetFeedbackForm} />} />
                <Route path="/aboutus" element={<About leaders={props.leaders}/>} />
                <Route path="*" element={getHomePage()}/>
            </Routes>
            <Footer />
        </div>
    );
}

// Connect this component with Redux
// withRouter is needed to use Router in this case
export default connect(mapStateToProps, mapDispatchToProps)(Main);
