import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddCar(props) {

    const [open, setOpen] = useState(false);  // Formin state, alussa suljettu
    const [car, setCar] = useState({ // Uus auto_olio tietojen tallentamiseksi
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    });

    const handleClickOpen = () => { // Formin avaus
      setOpen(true);
    };
  
    const handleClose = () => {     // Formin sulkeminen
      setOpen(false);
    };

    const handleSave = () => {  // tallennetaan uus auto
        props.addCar(car);
        handleClose();
    }

    const inputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    return(
        <div>
        <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add car
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>New car</DialogTitle>
            <DialogContent>
            <TextField
                margin="dense"
                label="Brand"
                name="brand" // Olion attribuutin nimi
                value={car.brand}   // Olio.attribuutti
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Model"
                name="model"
                value={car.model}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Color"
                name="color"
                value={car.color}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Fuel"
                name="fuel"
                value={car.fuel}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Year"
                name="year"
                value={car.year}  
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Price"
                name="price" 
                value={car.price}
                onChange={inputChanged}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="secondary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default AddCar;