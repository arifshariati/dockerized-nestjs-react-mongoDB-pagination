import React from 'react'

// MUI 
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem,FormControl,InputLabel } from '@material-ui/core';

const useStyles = makeStyles({
    formControl: {
        minWidth: 120,
    },
    });

const MUISelect = ({handleFilterGender, gender}) => {
    const classes = useStyles();
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
            <Select
                
                value={gender}
                onChange={handleFilterGender}
                label="Gender"
                className={classes.formControl}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
            </Select>
        </FormControl>
    )
}

export default MUISelect
