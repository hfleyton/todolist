import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import postCreateUser from '../actions/postCreateUser';
import { useHistory } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: 13,
    backgroundColor: theme.palette.warning.dark,
    '&:hover': {
      backgroundColor: grey[600],
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const singIn = () =>{
    history.push("/singin")
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const formData = new FormData(form);
    const payload = {};
    for (const [key, value] of formData.entries()) payload[key] = value;
    const passwordsMatch = payload.password === payload.confirmPassword;
    if (passwordsMatch) {
        const { success, data } = await postCreateUser(payload);
        console.log({data})
        if (success) {
            alert(data.mensaje);
            form.querySelectorAll('input').forEach((input) => (input.value = ''),);
            history.push("/singin")
        }
        else {
            alert('Usuario Registrado anteriormente');
        }
    } else {
        alert('La contraseña no coincide');
    }
}


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentTurnedInIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar Usuario
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-Mail"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Nombre Completo"
                name="fullName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Password"
                type="password"
                id="confirmPassword"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={singIn}>
                Usted ya esta registrado? Ingrese aquí
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}