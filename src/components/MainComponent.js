import { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from '../shared/dishes'
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";

function Main() {
    const [dishes, setDishes] = useState(DISHES);
    const [selectedDish, setSelectedDish] = useState(null);
  
    function onDishSelect(dishId){
        setSelectedDish(dishId);
    }

    return (
        <div>
            <Navbar dark color='primary'>
                <div className='container'>
                <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
                </div>
            </Navbar>
            <Menu dishes={dishes} onClick={(dishId) => {onDishSelect(dishId)}}/>
            <DishDetail 
                dish={dishes.filter((dish) => dish.id === selectedDish)[0]} />
        </div>
    );
}

export default Main;
