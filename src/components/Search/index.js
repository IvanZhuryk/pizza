import React, { useCallback, useContext, useRef, useState } from 'react'
import { SearchContex } from '../../App'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'

function Search() {
    const [value, setValue] = useState('')
    const {setSearchValue} = useContext(SearchContex)
    const inputRef = useRef()
    const updateSearchValue = useCallback(
        debounce( (value) => {
            setSearchValue(value);
        },500),
        []
    );
    const onChanceInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value);
    }
    return (
        <input 
            ref={inputRef}
            value={value} 
            onChange={onChanceInput} 
            className={styles.root} 
            placeholder='Поиск пицы...'
        />
    )
}

export default Search