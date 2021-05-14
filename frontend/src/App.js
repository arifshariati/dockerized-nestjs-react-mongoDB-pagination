import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// components
import { MUTable, MUISearch, MUISelect } from './components';

// MUI 
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

let endPoint = 'http://localhost:4000/user/all';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
      margin: 'auto',
      marginTop:'1rem',
      maxWidth:'90%'
  }
}));

function App() {

  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(100);
  

  // load users on page load
  useEffect(() => {
    
    (
      async () => {
        
        let arr = [];
        arr.push(`page=${page}`, `perPage=${perPage}`,`search=${search}`,`gender=${gender}`);

        try{
          
          Axios.get(`${endPoint}?${arr.join('&')}`)
          .then(result => {
            updateState(result.data);
          })
          .catch(err => {
            console.log('Axios Error', err);
          })
        }catch(e){
          console.log(e);
        }
        
      }
    )();
  },[search,page,perPage,gender]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePerPage = (event) => {
    setPerPage(event.target.value);
    setPage(0);
  };

  const updateState = (response) => {
    setUsers(response.data);
    setPage(response.page);
    setTotal(response.total);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleFilterGender = (event) => {
    setGender(event.target.value);
  }

  return (
    <div className={classes.mainContainer}>
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <MUISearch handleSearch={handleSearch} />
            </Grid>
            <Grid item>
              < MUISelect handleFilterGender={handleFilterGender} gender={gender} />
            </Grid>
          </Grid>
          
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <MUTable 
            data={users} 
            page={page} 
            perPage={perPage} 
            total={total}
            handleChangePage={handleChangePage} 
            handleChangePerPage={handleChangePerPage} 
          />
        </Grid>
      </Grid>
      
      
    </div>
  );
}

export default App;
