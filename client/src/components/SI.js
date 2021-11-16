import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import postLoginUser from '../actions/postLoginUser';
import { useHistory } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';



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
    marginTop: theme.spacing(1),
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

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const singUp = () =>{
    history.push("/singup")
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const formData = new FormData(form);
    const payload = {};
    for (const [key, value] of formData.entries()) payload[key] = value;
    const { data }= await postLoginUser (payload);
    if (data.status === "OK") {
        //alert(data.mensaje);
        form.querySelectorAll('input').forEach((input) => (input.value = ''),);
        window.localStorage.setItem('email',payload.email)// crear localstorage
        window.localStorage.setItem('nombreUsuario',data.fullName)
        history.push("/main")
    }
    else {
      console.log(data)
      alert(data.mensaje);
    }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-Mail"
            name="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar Sesión
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={singUp}>
                {"No tienes cuenta? Registrate!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}