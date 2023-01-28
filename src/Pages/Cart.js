import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { clearItems} from '../redux/slices/cartSlice';

function Cart() {

    const dispatch = useDispatch();
    const {items, totalPrice} = useSelector(state => state.cartSlice);
    const countPizzas = items.reduce((sum,obj)=>{
        return obj.count + sum;
    },0);
    const handleDelete = () => {
        dispatch(clearItems())
        console.log(totalPrice)
    }
    return (
        <div className="cart">
            <div className="cart__top">
                <h2 className="content__title"> Корзина</h2>
                <div className="cart__clear">
                
                <span onClick={handleDelete}>Очистить корзину</span>
                </div>
            </div>
            {items.map((item)=>(
                <CartItem key={item.id} title = {item.title} image={item.image} price={item.price} count={item.count}></CartItem>
            ))}
            <div className="cart__bottom">
                <div className="cart__bottom-details">
                <span> Всего пицц: <b>{countPizzas} шт.</b> </span>
                <span> Сумма заказа: <b>{totalPrice} грн.</b> </span>
            </div>
            <div className="cart__bottom-buttons">
                <Link to="/" className="button button--outline button--add go-back-btn">
                    
                    <span>Вернуться назад</span>
                </Link>
                <div className="button pay-btn">
                    <span>Оплатить сейчас</span>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Cart