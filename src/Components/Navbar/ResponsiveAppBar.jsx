import * as React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import DarkMode from '../DarkMode/DarkMode';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Popular', path: '/movies' },
  { name: 'Top Rated', path: '/top-rated' },
  { name: 'Favorites', path: '/favorites' }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Track scroll for glass effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    const isLoggedIn = localStorage.getItem('user') || localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuClick = (setting) => {
    handleCloseUserMenu();
    if (setting === 'Logout') {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      navigate('/');
    } else if (setting === 'Profile') {
      navigate('/profile');
    } else if (setting === 'Account') {
      navigate('/account');
    }
  };

  const isActivePage = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 'var(--z-sticky)',
        backgroundColor: scrolled 
          ? 'var(--color-bg-glass)' 
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled 
          ? '1px solid var(--color-border)' 
          : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            minHeight: { xs: '64px', md: '72px' },
            py: 1,
          }}
        >
          {/* Logo - Desktop */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              mr: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-secondary) 100%)',
                boxShadow: '0 0 20px var(--color-accent-glow)',
              }}
            >
              <MovieFilterIcon sx={{ color: '#fff', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MovieMaze
            </Typography>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: 'var(--color-text-primary)',
                '&:hover': {
                  backgroundColor: 'var(--color-bg-tertiary)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  mt: 1,
                  minWidth: 200,
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={handleCloseNavMenu}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'var(--color-bg-tertiary)',
                    },
                  }}
                >
                  <Typography
                    component={Link}
                    to={page.path}
                    sx={{
                      textDecoration: 'none',
                      color: isActivePage(page.path) 
                        ? 'var(--color-accent-primary)' 
                        : 'var(--color-text-primary)',
                      fontWeight: isActivePage(page.path) ? 600 : 400,
                      width: '100%',
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              gap: 1,
              flexGrow: 1,
              textDecoration: 'none',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-secondary) 100%)',
              }}
            >
              <MovieFilterIcon sx={{ color: '#fff', fontSize: 18 }} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--color-text-primary)',
              }}
            >
              MovieMaze
            </Typography>
          </Box>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {pages.map((page) => (
              <Box
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  mx: 0.5,
                  borderRadius: 'var(--radius-md)',
                  color: isActivePage(page.path) 
                    ? 'var(--color-accent-primary)' 
                    : 'var(--color-text-secondary)',
                  fontWeight: isActivePage(page.path) ? 600 : 500,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'var(--color-text-primary)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                  },
                  '&::after': isActivePage(page.path) ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 20,
                    height: 3,
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(90deg, var(--color-accent-primary) 0%, var(--color-accent-secondary) 100%)',
                  } : {},
                }}
              >
                {page.name}
              </Box>
            ))}
          </Box>

          {/* Right side actions */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
            <DarkMode />
            
            <Tooltip title="Account settings" arrow>
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{ 
                  p: 0.5,
                  border: '2px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'var(--color-accent-primary)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Avatar 
                  alt="User" 
                  src="/static/images/avatar/2.jpg"
                  sx={{ 
                    width: 36, 
                    height: 36,
                    backgroundColor: 'var(--color-accent-primary)',
                  }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ 
                mt: '45px',
                '& .MuiPaper-root': {
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  minWidth: 180,
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {['Profile', 'Account', 'Logout'].map((setting) => (
                <MenuItem 
                  key={setting} 
                  onClick={() => handleUserMenuClick(setting)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'var(--color-bg-tertiary)',
                    },
                  }}
                >
                  <Typography 
                    sx={{ 
                      color: setting === 'Logout' 
                        ? 'var(--color-error)' 
                        : 'var(--color-text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
