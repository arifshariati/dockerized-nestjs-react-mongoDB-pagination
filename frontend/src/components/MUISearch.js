import React from 'react';

// MUI 
import { TextField } from '@material-ui/core';

const MUISearch = ({handleSearch}) =>{

    return (
        <TextField 
            name={'search'} 
            id="outlined-basic" 
            label="Search" 
            variant="outlined" 
            onChange={handleSearch} 
        />
    )
}

export default MUISearch
