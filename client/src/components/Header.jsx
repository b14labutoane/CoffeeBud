import React from 'react';
import '../styles/Header.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import IconButton from '@mui/material/IconButton';

function Header(){
    return (
        <div classname="header">
            <h2>COFFEE BUD</h2>
            <IconButton link to="link catre sign">
            <AccountBoxIcon classname="header_logo"/>
            </IconButton>
        </div>
    );
} 