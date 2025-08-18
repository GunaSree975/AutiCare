import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet} from "react-router-dom";
import { GameStatsProvider } from '../context/GameStatsContext';

function Root() {
  return (

    <>

<div className='main flex flex-col h-screen'>
  <Header/>
  <GameStatsProvider>
    <Outlet/>
  </GameStatsProvider>
</div>


    
    
    
    </>
   
  )
}

export default Root