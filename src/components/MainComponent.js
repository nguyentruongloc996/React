import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import Contact from './ContactComponent';
import Header from "./HeaderComponent";
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreater';

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
    addComment: (dishId, rating, author, comments) => dispatch(addComment(dishId, rating, author, comments))
});

function Main(props) {

    function getHomePage()
    {
        return (
            <Home 
                dish={props.dishes.filter((dish) => dish.featured)[0]}
                promotion={props.promotions.filter((promotion) => promotion.featured)[0]}
                leader={props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }

    function DishWithId() {
        const params = useParams();
        return (
            <DishDetail 
                dish={props.dishes.filter(dish => dish.id === parseInt(params.dishId,10))[0]} 
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
                <Route path="/contactus" element={<Contact />} />
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
