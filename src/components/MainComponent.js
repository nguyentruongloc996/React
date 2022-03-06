import { useState } from 'react';
import Home from './HomeComponent';
import { DISHES } from '../shared/dishes'
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from './FooterComponent';
import { Routes, Route, Navigate } from 'react-router-dom';

function Main() {
    const [dishes, setDishes] = useState(DISHES);
    const [selectedDish, setSelectedDish] = useState(null);

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/menu" element={<Menu dishes={dishes} />} />
                <Route path="*" element={<Home />}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default Main;
