import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// components
import { MUTable } from './components';

let endPoint = 'http://localhost:4000/user/all';

function App() {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(100);
  

  // load users on page load
  useEffect(() => {
    
    (
      async () => {
        
        let arr = [];
        arr.push(`page=${page}`, `perPage=${perPage}`);

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
  },[page,perPage]);

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

  return (
    <div className="App">
      <MUTable 
        data={users} 
        page={page} 
        perPage={perPage} 
        total={total}
        handleChangePage={handleChangePage} 
        handleChangePerPage={handleChangePerPage} 
      />
    </div>
  );
}

export default App;
