import React, { useEffect, useState } from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import { useHistory } from 'react-router-dom';
import getPets from '../actions/readPets.action'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { grey } from '@material-ui/core/colors';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CancelIcon from '@material-ui/icons/Cancel';
import deletePets from '../actions/deletePet.action'
import addPet from '../actions/createPet.action'
import updatePet from '../actions/updatePet.action'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Cookies } from "react-cookie";

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.warning.dark,
      color: theme.palette.common.white,
      fontSize: 20,
      fontFamily: 'Segoe UI',
      fontStyle: 'normal',
      width : 500
    },
    body: {
      fontSize: 18,
      fontFamily: 'Segoe UI',
      fontStyle: 'normal',
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(10),
      backgroundColor : '#E8E7E7',
      margin: 'auto',
    },
    title: {
      flexGrow: 1,
    },
    submit: {
      margin: theme.spacing(1, 1, 1, 0),
      fontSize: 10,
      backgroundColor: theme.palette.warning.dark,
      '&:hover': {
        backgroundColor: grey[600],
      },
    },
    table: {
      minWidth: 700,
    },
  }));


export default function Orders() {

  const [alertError, setAlertError] = useState(true)
  const [alertMessages, setAlertMessages] = useState()

  const onSubmitAdd = async (e) => {
    e.preventDefault();
    setAlertError(true)
    const form = e.target.closest('form');
    const formData = new FormData(form);
    const arr = {}
    for (const [key, value] of formData.entries()) arr[key] = value;
    const payload = {
      "email":window.localStorage.getItem('email'),
      "nombre" : arr.nombre,
      "descripcion" : arr.descripcion
    }
    console.log(payload)
    const { success, data } = await addPet (payload);
    if (success) {
        //window.alert(data.mensaje);
        form.querySelectorAll('input').forEach((input) => (input.value = ''),);
        setOpenAdd(false);
        setState(state+1)
        setAlertMessages(data.mensaje)
    }
    else {
        //window.alert(data[0].message);
        setAlertError(false)
        setAlertMessages(data[0].message)
    }
  }

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const formData = new FormData(form);
    const arr = {}
    for (const [key, value] of formData.entries()) arr[key] = value;
    const payload = {
      "email" : window.localStorage.getItem('email'),
      "nombre" : window.localStorage.getItem('nombre'),
      "descripcion" : arr.descripcion
    }
    console.log(payload)
    const { success, data } = await updatePet (payload);
    if (success) {
        //window.alert(data.mensaje);
        form.querySelectorAll('input').forEach((input) => (input.value = ''),);
        setOpenEdit(false);
        setState(state+1)
        setAlertMessages(data.mensaje)
    }
    else {
        //window.alert(data[0].message);
        setAlertMessages(data[0].message)
    }
  }


  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setAlertError(true)
  };

  const handleClickOpenEdit = (nombre, descripcion) => {
    setOpenEdit(true);
    window.localStorage.setItem('nombre',nombre)
    window.localStorage.setItem('descripcion',descripcion)
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setAlertError(true)
  };

  const history = useHistory();
  const classes = useStyles();

  const [pets, setPets ] = useState([]);
  const [state, setState ] = useState(0);

  useEffect(() => {
    const payload = {
      "email" : window.localStorage.getItem('email')
    }
    console.log(payload)
    const getAllPets = async () => {
      const { success, data} = await getPets(payload);
      if (success) {
        const array = data.allTareas
        array.sort(function (a, b) {
          if (a.type > b.type) {
            return 1;
          }
          if (a.type < b.type) {
            return -1;
          }
            return 0;
          });
          setPets(array)
        }
      };
    getAllPets();
  }, [state]);

  const cerrar = () => {
    history.push("/")
    window.localStorage.clear();
    //Cookies.remove("usertoken")
  }

  const delPet = async (nombre) => {
    const payload = {
    "email" : window.localStorage.getItem('email'),
    "nombre" : nombre
    }
    console.log(payload)
    const { success, data } = await deletePets (payload);
    if (success) {
        setState(state+1)
    }
    else {
        alertError(data[0].message);
    }
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <h1><CheckCircleIcon/> To Do List</h1>
          </Grid>
          <Grid item xs={2} >
          <Button onClick={cerrar} type="button" variant="contained" color="primary" className={classes.submit} startIcon={<PowerSettingsNewIcon/>} >
          <h3>Hola {window.localStorage.getItem('nombreUsuario')}</h3>
          </Button>
          </Grid>
          <Grid item xs={9}>
            <h3>Estas son las tareas que tienes pendientes...</h3>
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" variant="contained" color="primary" className={classes.submit} startIcon={<AddIcon/>} onClick={handleClickOpenAdd}>
              Agregar
            </Button>
            <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="form-dialog-title">
            <form onSubmit={onSubmitAdd}>
              <DialogTitle id="form-dialog-title">Agregar Nueva Tarea</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Para agregar una nueva tarea, ingresa un nombre y una descripcion en el siguiente formulario
                  </DialogContentText>
                  {alertError ? "" : 
                    <Alert severity="warning">
                    <AlertTitle>Advertencia</AlertTitle>
                      {alertMessages} — <strong>Intenta Nuevamente!</strong>
                    </Alert>
                  }
                  <TextField  margin="dense" id="nombre" name="nombre" label="Nombre Tarea" type="text" fullWidth/>
                  <TextField  margin="dense" id="descripcion" name="descripcion" label="Descripcion Tarea" type="text" fullWidth/>
                </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAdd} type="button" variant="contained" color="primary" className={classes.submit} startIcon={<CancelIcon/>}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary" className={classes.submit} startIcon={<SaveIcon/>}>
                  Guardar
                </Button>
              </DialogActions>
              </form>
            </Dialog>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            <TableContainer className={classes.table} component={Paper}>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell>Descripcion</StyledTableCell>
                    <StyledTableCell>Acciones</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {pets.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell>{row.nombre}</StyledTableCell>
                      <StyledTableCell>{row.descripcion}</StyledTableCell>
                      <StyledTableCell>
                        <Button type="submit" variant="contained" color="primary" className={classes.submit} startIcon={<EditIcon/>} onClick={(e) => {handleClickOpenEdit(row.nombre,row.descripcion)}}>
                          Editar
                        </Button>
                        <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                          <form onSubmit={onSubmitEdit}>
                            <DialogTitle id="form-dialog-title">Editar Tarea</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Para editar esta tarea, modifica los en el siguiente formulario
                                </DialogContentText>
                                {alertError ? "" : 
                                  <Alert severity="warning">
                                  <AlertTitle>Advertencia</AlertTitle>
                                    {alertMessages} — <strong>Intenta Nuevamente!</strong>
                                  </Alert>
                                }
                                <TextField  margin="dense" id="name" name="nombre" label="Nombre Tarea" type="text" fullWidth value = {window.localStorage.getItem('nombre')}/>
                                <TextField  margin="dense" id="descripcion" name="descripcion" label="Descripcion Tarea" type="text" fullWidth defaultValue = {window.localStorage.getItem('descripcion')}/>
                              </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseEdit} type="button" variant="contained" color="primary" className={classes.submit} startIcon={<CancelIcon/>}>
                                Cancelar
                              </Button>
                              <Button type="submit" variant="contained" color="primary" className={classes.submit} startIcon={<SaveIcon/>}>
                                Guardar
                              </Button>
                            </DialogActions>
                          </form>
                        </Dialog>
                        <Button type="submit" variant="contained" color="primary" className={classes.submit} startIcon={<CheckCircleIcon/>} onClick={(e) => {delPet(row.nombre)}}>
                          Listo
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
