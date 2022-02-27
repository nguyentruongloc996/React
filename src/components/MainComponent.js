import { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from '../shared/dishes'
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from './FooterComponent';

function Main() {
    const [dishes, setDishes] = useState(DISHES);
    const [selectedDish, setSelectedDish] = useState(null);
  
    function onDishSelect(dishId){
        setSelectedDish(dishId);
    }

    return (
        <div>
            <Header />
            <Menu dishes={dishes} onClick={(dishId) => {onDishSelect(dishId)}}/>
            <DishDetail 
                dish={dishes.filter((dish) => dish.id === selectedDish)[0]} />
            <Footer />
        </div>
    );
}

export default Main;
