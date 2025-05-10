import * as React from 'react';
import { CssVarsProvider, useColorScheme, extendTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useNavigate } from 'react-router-dom';

// Define a complete theme
const theme = extendTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#6200ea',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#b388ff',
        },
      },
    },
  },
  typography: {
    h4: {
      fontSize: '32px',
    },
    body1: {
      fontSize: '16px',
    },
    'body-sm': {
      fontSize: '14px',
    },
    'body-md': {
      fontSize: '16px',
    },
    'body-lg': {
      fontSize: '18px',
    },
    button: {
      fontSize: '16px',
    },
  },
});

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="soft" sx={{ fontSize: '16px' }}>
        Change mode
      </Button>
    );
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

export default function LoginFinal({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setIsLoggedIn(true);
    setError('');
    navigate('/');
  };

  return (
    <main>
      <CssVarsProvider theme={theme}>
        <ModeToggle />
        <CssBaseline />
        <Sheet
          sx={{
            width: 300,
            mx: 'auto',
            my: 4,
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          {error && (
            <Typography level="body-sm" color="danger">
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" sx={{ mt: 1, fontSize: '16px' }}>
              Log in
            </Button>
          </form>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            sx={{ fontSize: '14px', alignSelf: 'center' }}
          >
            Don't have an account?
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </main>
  );
}