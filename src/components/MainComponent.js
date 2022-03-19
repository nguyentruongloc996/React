import { useState } from 'react';
import Home from './HomeComponent';
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments'
import { LEADERS } from '../shared/leaders'
import { PROMOTIONS } from '../shared/promotions'
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import Contact from './ContactComponent';
import Header from "./HeaderComponent";
import Footer from './FooterComponent';
import { Routes, Route, useParams } from 'react-router-dom';

function Main() {
    const [dishes, setDishes] = useState(DISHES);
    const [comments, setComments] = useState(COMMENTS);
    const [leaders, setLeaders] = useState(LEADERS);
    const [promotions, setPromotions] = useState(PROMOTIONS);
    const [selectedDish, setSelectedDish] = useState(null);

    function getHomePage()
    {
        return (
            <Home 
                dish={dishes.filter((dish) => dish.featured)[0]}
                promotion={promotions.filter((promotion) => promotion.featured)[0]}
                leader={leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }

    function DishWithId() {
        const params = useParams();
        return (
            <DishDetail dish={dishes.filter(dish => dish.id === parseInt(params.dishId,10))[0]} comments={comments.filter(comments => comments.dishId === parseInt(params.dishId,10))}
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
                <Route exact path="/menu" element={<Menu dishes={dishes} />} />
                <Route path="/menu/:dishId" element={<DishWithId />}/>
                <Route path="/contactus" element={<Contact />} />
                <Route path="*" element={getHomePage()}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default Main;
