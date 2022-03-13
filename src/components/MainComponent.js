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
import { Routes, Route, Navigate } from 'react-router-dom';

function Main() {
    const [dishes, setDishes] = useState(DISHES);
    const [comments, setCommonts] = useState(COMMENTS);
    const [leaders, setLeaders] = useState(LEADERS);
    const [promotions, setPromotions] = useState(PROMOTIONS);
    const [selectedDish, setSelectedDish] = useState(null);

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/home" element={
                    <Home 
                        dish={dishes.filter((dish) => dish.featured)[0]}
                        promotion={promotions.filter((promotion) => promotion.featured)[0]}
                        leader={leaders.filter((leader) => leader.featured)[0]}
                    />
                } />
                <Route path="/menu" element={<Menu dishes={dishes} />} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="*" element={<Home />}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default Main;
