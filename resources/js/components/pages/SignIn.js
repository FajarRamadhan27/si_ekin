import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../containers/copyright';
import { Alert } from '@mui/material';
import Axios from 'axios';
import SetAuthorizationToken from '../../utils/SetAuthorizationToken';
import { SET_CURRENT_USER } from '../../helpers/constant';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/userSlice';

const theme = createTheme();

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

function SignIn(props) {

  const dispatch = useDispatch()
  const [errorMessage, setError] = React.useState(null)

  const { setInitialMenu } = props.uiAttr

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get('email')
    let password = data.get('password')

    Axios.post('http://127.0.0.1:8000/api/login', { email, password }).then( response => {
        const { status, messages, token, user } = response.data

        if (status) {
            setError(null)
            localStorage.setItem('jwtToken', token)
            localStorage.setItem('user', JSON.stringify(user))
            SetAuthorizationToken(token)
            dispatch(setUser(user))
        } else {
            setError(messages);
        }

    }).catch(e => console.log(e))
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            { errorMessage ? <Alert severity="warning">{ errorMessage }</Alert> : null }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setInitialMenu('SIGN_UP')}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
