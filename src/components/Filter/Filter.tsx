import React, { useState, useRef } from 'react'
import classes from './Filter.module.css'
import { SortIcon } from '../Icons/Icons'
import { useClickOutside } from '../../hooks/useClickOutSide'

interface IFilter {
  sortPrice(): void
  sortTitle(): void
  sortPopular(): void
}

const Filter: React.FC<IFilter> = ({ sortPrice, sortTitle, sortPopular }) => {
  const [isOpenSort, setIsOpenSort] = useState(false)
  const [sortCategory, setSortCategory] = useState('popular')
  const sortPopup = useRef(null)
  const popupCls = [classes.sortPopup]

  useClickOutside(sortPopup, () => setIsOpenSort(false))

  const sortByPopular = () => {
    setSortCategory('popular')
    sortPopular()
  }

  const sortByTitle = () => {
    setSortCategory('title')
    sortTitle()
  }

  const sortByPrice = () => {
    setSortCategory('price')
    sortPrice()
  }

  if (isOpenSort) {
    popupCls.push(classes.Active)
  }

  let sortText = 'популярности'
  switch (sortCategory) {
    case 'popular':
      sortText = 'популярности'
      break
    case 'title':
      sortText = 'названию'
      break
    case 'price':
      sortText = 'цене'
      break
    default:
      sortText = 'популярности'
      break
  }

  return (
    <div>
      <span className={classes.SortTitle}>
        <SortIcon />
        Сортировка по:
      </span>
      <span
        ref={sortPopup}
        className={classes.SortVal}
        onClick={() => setIsOpenSort(!isOpenSort)}>
        {sortText}
        <div className={popupCls.join(' ')}>
          <ul className={classes.List}>
            <li onClick={sortByPopular}>популярности</li>
            <li onClick={sortByTitle}>названию</li>
            <li onClick={sortByPrice}>цене</li>
          </ul>
        </div>
      </span>
    </div>
  )
}

export default Filter
