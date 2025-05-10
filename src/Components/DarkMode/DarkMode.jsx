import React from 'react'
import './DarkMode.css'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const DarkMode = () => {

    const setDarkTheme = () => {
        document.querySelector("body").setAttribute("data-theme","dark");
        localStorage.setItem("selectedTheme","dark");
    }

    const setLightTheme = () => {
        document.querySelector("body").setAttribute("data-theme","light")
        localStorage.setItem("selectedTheme","light");
    }

    const selectedTheme = localStorage.getItem("selectedTheme");
    if(selectedTheme==="light"){
        setLightTheme();
    }else{
        setDarkTheme();
    }

    const toggleTheme = e => {
        if(e.target.checked){
            setDarkTheme();
        }else{
            setLightTheme();
        }
    }
  return (
    <div className='dark-mode'>
      <input className='dark-mode-input' type="checkbox" id="dark-mode-toggle" onChange={toggleTheme} defaultChecked={selectedTheme!=="light"}/>
      <label className='dark-mode-lable' htmlFor='dark-mode-toggle'>
        <LightModeIcon />
        <DarkModeIcon />
      </label>
    </div>
  )
}

export default DarkMode
