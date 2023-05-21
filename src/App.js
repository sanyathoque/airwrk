import react, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const [alldata, setAlldata] = useState()
  const [formval, setFormval] = useState({id:0,name:'',username:'',email:'',address:''})
  const [formid, setFormid] = useState()
  const [id, setId] = useState('')
  let rowsPerPage = 10
  let page = 1
  const columns = [
    { id: 'id', label: 'id', minWidth: 170 },
    { id: 'name', label: 'name', minWidth: 100 },
    {
      id: 'username',
      label: 'username',
      minWidth: 170,
      align: 'right',
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'email',
      label: 'email',
      minWidth: 170,
      align: 'right',
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'address',
      label: 'address',
      minWidth: 170,
      align: 'right',
      // format: (value) => value.toFixed(2),
    },
  ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setFormid(alldata[e.target.value])
    setOpen(true);
    formval['id'] = alldata[e.target.value].id
    formval['name'] = alldata[e.target.value].name
    formval['username'] = alldata[e.target.value].username
    formval['email'] = alldata[e.target.value].email
    formval['address'] = alldata[e.target.value].address
    setFormval(formval)
    // console.log('Formval',formval)
  };
  const changeval = (e) => {
    if (e.target.id==='name') { alldata[formid.id-1].name = e.target.value }
    if (e.target.id==='username') alldata[formid.id-1].username = e.target.value
    if (e.target.id==='email') alldata[formid.id-1].email = e.target.value
    if (e.target.id==='address') alldata[formid.id-1].address = e.target.value
    setAlldata(alldata)
  }
  const handleClose = () => {
    setOpen(false);
    
  };

  function createData(name, code, population, size) {
    const density = population / size;
    // console.log('information', { name, code, population, size, density })
    return { name, code, population, size, density };
  }

  const rows = [
    { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: 'asdasd' }
  ];
  function handleDelete(e) {
    console.log('e', e.target.value)
    let new_arr = alldata
    new_arr.splice(e.target.value, 1) 
    setAlldata(oldValues => {
      return oldValues.filter((fruit,idx) => idx !== e.target.value)
    })
  }
  console.log('setAlldata', alldata)
  useEffect(() => {
    if (true) {
      let new_arr = []
      fetch('https://jsonplaceholder.typicode.com/users', { headers: { 'Accept': 'application/json' } })
        .then(res => res.json())
        .then(data => {
          data.map((val, idx) => {
            let obj = {}
            obj.id = val.id
            obj.name = val.name
            obj.username = val.username
            obj.email = val.email
            obj.address = val.address.street
            new_arr.push(obj)
          })
          console.log('new_arr', new_arr)
          return new_arr
        })
        .then(data => {
          setAlldata(data)
        })
        .catch(err => {
          console.log(err)
        });
    }
  }, [])
  console.log('RunningFetchReq Alldata', alldata)
  console.log('reqwrwer',formval)
  return (
    <div className="App">
      <Paper sx={{ width: '100%', height: '100% !important' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* <TableBody> */}
              {alldata && alldata
                .slice(0, 10)
                .map((row, idx) => {
                  console.log('row_idx', row, idx)
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <button value={idx} onClick={(e) => handleClickOpen(e)}>Edit</button>
                      <button value={idx} onClick={(e) => handleDelete(e)}>Delete</button>
                    </TableRow>
                  );
                })}
            {/* </TableBody> */}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={() => { }}
          onRowsPerPageChange={() => { }}
        />
      </Paper>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
          </DialogContentText>
          id: <input style={{width:"100%", height:"4vh"}} autoFocus margin="dense" id="id" label="id" type="number" placeholder={formval.id} defaultValue={formval.id} onChange={(e)=>{changeval(e)}} fullWidth variant="standard"  />
          name: <input style={{width:"100%", height:"4vh"}} autoFocus margin="dense" id="name" label="name" type="text" placeholder={formval.name} defaultValue={formval.name} onChange={(e)=>{changeval(e)}} fullWidth variant="standard"  />
          username: <input style={{width:"100%", height:"4vh"}} autoFocus margin="dense" id="username" label="username" type="text" placeholder={formval.username} defaultValue={formval.username} onChange={(e)=>{changeval(e)}} fullWidth variant="standard"  />
          email: <input style={{width:"100%", height:"4vh"}} autoFocus margin="dense" id="email" label="email" type="email" placeholder={formval.email} defaultValue={formval.email} onChange={(e)=>{changeval(e)}} fullWidth variant="standard"  />
          address: <input style={{width:"100%", height:"4vh"}} autoFocus margin="dense" id="address" label="address" type="text" placeholder={formval.address} defaultValue={formval.address} onChange={(e)=>{changeval(e)}} fullWidth variant="standard"  /> 
          {/* <textField autoFocus margin="dense" id="id" label="id" type="id" defaultValue={formval.id} onChange={(e)=>{changeval(e)}} fullWidth variant="standard"  />
          <TextField autoFocus margin="dense" id="name" label="name" type="text" defaultValue={formval.name} fullWidth variant="standard"  />
          <TextField autoFocus margin="dense" id="name" label="username" type="text" defaultValue={formval.username} fullWidth variant="standard"  />
          <TextField autoFocus margin="dense" id="name" label="email" type="email" defaultValue={formval.email} fullWidth variant="standard"  />
          <TextField autoFocus margin="dense" id="name" label="address" type="text" defaultValue={formval.address} fullWidth variant="standard"  /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>X</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
