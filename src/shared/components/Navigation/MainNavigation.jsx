import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import BackDrop from '../UIElements/BackDrop/Backdrop'

const MainNavigation = (props) => {
  const [drawerIsOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  }

  return (
    <>
      <MainHeader>
          <button className='main-navigation__menu-btn' onClick={handleOpenDrawer}>
              <span></span>
              <span></span>
              <span></span>
          </button>
          <h1 className='main-navigation__title'>
              <Link to='/'>Your Places</Link>
          </h1>
          <nav className='main-navigation__header-nav'>
              <NavLinks/>
          </nav>
      </MainHeader>
      {drawerIsOpen && <BackDrop onClick={handleCloseDrawer}/>}
      <SideDrawer show={drawerIsOpen} onClick={handleCloseDrawer}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks/>
        </nav>
      </SideDrawer>
    </>
  )
}

export default MainNavigation