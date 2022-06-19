import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import Contact from './ContactComponent';
import Header from "./HeaderComponent";
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreater';
import { useEffect } from 'react';
import { actions } from 'react-redux-form';

// Map Redux Store states into Component props
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

// addComment function return an Action
// then dispatch receive that Action as parameter to send it to store
const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comments) => dispatch(addComment(dishId, rating, author, comments)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

function Main(props) {

    useEffect(() => {
        props.fetchDishes();
    }, []);

    function getHomePage()
    {
        return (
            <Home 
                dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={props.dishes.isLoading}
                dishesErrMess={props.dishes.errMess}
                promotion={props.promotions.filter((promotion) => promotion.featured)[0]}
                leader={props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }

    function DishWithId() {
        const params = useParams();
        return (
            <DishDetail 
                dish={props.dishes.dishes.filter(dish => dish.id === parseInt(params.dishId,10))[0]}
                isLoading={props.dishes.isLoading}
                errMess={props.dishes.errMess}
                comments={props.comments.filter(comments => comments.dishId === parseInt(params.dishId,10))}
                addComment={props.addComment}
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
                <Route exact path="/menu" element={<Menu dishes={props.dishes} />} />
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
