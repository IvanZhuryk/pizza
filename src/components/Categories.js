import React from 'react'

function Categories({value, onClickCategory}) {
    
    

    const categories = [
        'Все',
        'Мясные',
        'Вегетерианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    
    return (
        <div className='categories'>
            <ul>
                {
                    categories.map((categori, index)=> (
                        <li  key={categori} onClick={()=>onClickCategory(index)} className={value === index? 'active':''}>{categori}</li>
                    ))
                }
                
            </ul>
        </div>
    )
}

export default Categories