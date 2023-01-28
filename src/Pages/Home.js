import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import qs from 'qs'

import PizzaBlock from '../components/PizzaBlock';
import Sort, { list } from '../components/Sort';
import Categories from '../components/Categories';
import FakePizzaBlock from '../components/FakePizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContex } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCourentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const { categoryId, sort, courentPage } = useSelector((state) => state.filterSlice);
    const {serchValue} = useContext(SearchContex)
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (page) => {
        dispatch(setCourentPage(page))
    }
    useEffect(()=>{
        if(window.location.search){
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) =>obj.sortProperty === params.sortProperty);          
            dispatch(setFilters({...params, sort}))
            isSearch.current = true;
        }
    },[])
    
    useEffect( ()=> {
        setIsLoading(true);
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-','');
        const category =categoryId > 0 ? `category=${categoryId}` : '';
        const search = serchValue ? `&search=${serchValue}` : '';
        axios.get(`https://63bef25be348cb07621ce7cc.mockapi.io/items?page=${courentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then((response)=>{
            setItems(response.data)
            setIsLoading(false)
        })
    },[categoryId, sort.sortProperty,serchValue,courentPage])
    
    useEffect(()=>{
        const queryString = qs.stringify({
            sortProperty:sort.sortProperty,
            categoryId,
            courentPage,
        });
        navigate(`?${queryString}`);
    },[categoryId, sort.sortProperty,courentPage])

    return (
        <>
            <div className='content__top'>
                <Categories value={categoryId} onClickCategory={onClickCategory}></Categories>
                <Sort></Sort>
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isLoading ? [...new Array(8)].map((_,i)=><FakePizzaBlock key={i}></FakePizzaBlock>) 
                : items.map((pizza)=>(
                <PizzaBlock key={pizza.id}
                    title= {pizza.title} 
                    price={pizza.price} 
                    image={pizza.imageUrl} 
                    sizes={pizza.sizes}
                    types={pizza.types}
                    >
                    
                </PizzaBlock>
                ))}
            </div>
            <Pagination value={courentPage} onChangePage = {onChangePage} />
        </>
    )
}

export default Home