import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Snackbar } from '@material-ui/core';

import AddCar from './AddCar';
import EditCar from './EditCar';

function Carlist(){

    const [cars, setCars] = useState([]); // tyhjä taulukko vastaanotettaville autoille
    const [open, setOpen] = useState('');
    useEffect(() => {
        getCars();
    }, [])

    const getCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }


    const handleOpen = () => {
        setOpen(true);
    } 

    const handleClose = () => {
        setOpen(false);
    }

    const deleteCar = (params) => {
       // console.log(params.value);
       if (window.confirm("Are you sure?")){ // Jos painaa ok ni true => delete tapahtuu, jos cancel niin false ja ei tapahdu
        fetch(params.value, {
            method: 'DELETE'
        })
        .then(_ => getCars()) // _ meinaa että olio tulee sisään mutta sitä ei käytetä
        .then(_ => handleOpen())
        .catch(err => console.err(err))
        }
    }

    const addCar = (newCar) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newCar)
        })
        .then(response => getCars()) // haetaan päivittynyt autolista
        .catch(err => console.error(err))
    }

    const updateCar = (link, car) => {
        fetch(link, {
            method: 'PUT',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => getCars())
        .catch(err => console.error(err))
    }


    const columns = [
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'year', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true},
        {
            headerName: '',
            field: '_links.self.href',
            width: 90,
            cellRendererFramework: params =>
            <EditCar updateCar={updateCar} params={params} />
        },
        {
            headerName: '',
            field: '_links.self.href',
            width: 90,
            cellRendererFramework: params =>
                <IconButton onClick={() => deleteCar(params)}>
                    <DeleteIcon color="secondary"/>
                </IconButton>
        }
    ]
                    // addCar-funktio propsina eteenpäin
    return(
        <div>
            <AddCar addCar={addCar} /> 
             <div className="ag-theme-material" style={ { height: 600, width: '92%', margin: 'auto' } }>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination="true"
                    paginationPageSize="10"
                >
                </AgGridReact>
            </div>
            <Snackbar 
            open={open}
            onClose={handleClose}
            autoHideDuration={2500}
            message="Car deleted successfully"
            />
        </div>
    )
}

export default Carlist;