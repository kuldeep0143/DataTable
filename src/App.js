
import { useEffect, useState } from 'react';
import './App.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const customStyles ={
  headRow: {
    style: {
      backgroundColor : '#482673',
      color:"white"
    }
  },
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: "600",
      textTransform: 'uppercase',

    },
  },
  cells: {
    style : {
      fontSize : '15px',
    },
  },
};

function App() {
  const columns = [
    {
      name: 'ID',
      selector:row => row.id,
      sortable : true
    },
    {
      name:'Name',
       selector:row => row.name,
      sortable : true

    },
    {
      name:'Email',
       selector:row => row.email,
      sortable : true

    },
    {
      name:'Address',
       selector:row => row.address.city,
      sortable : true

    }
  ]
  useEffect(()=> {
    const fetData = async () => {
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setRecords(res.data)
        setFilterRecords(res.data)
      })
      .catch(err => console.log(err));
    }
    fetData();
  }, [])

  const [records ,setRecords] = useState([])
  const [filterRecords ,setFilterRecords] = useState([])

  
  function handleFilter (event) {
    const newData = filterRecords.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setRecords(newData)
  }

  return (
    <div style={{padding: "50px 10%",backgroundColor:"gray"}}>
      <div style={{display:'flex',justifyContent:'right'}}> 
      <input type='text' placeholder='Search...'onChange={handleFilter} style={{padding:'8px 10px'}}></input></div>
      <DataTable
        columns ={columns}
        data = {records}
        customStyles={customStyles}
        selectableRows
        fixedHeader
        pagination
      ></DataTable>
    </div>
  );
}

export default App;
