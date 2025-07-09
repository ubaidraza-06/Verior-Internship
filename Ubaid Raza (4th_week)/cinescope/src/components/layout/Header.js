import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  TextField, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Menu as MenuIcon, 
  Close as CloseIcon,
  Home as HomeIcon,
  Movie as MovieIcon,
  People as PeopleIcon,
  LiveTv as LiveTvIcon
} from '@mui/icons-material';
import { useDebounce } from '../../hooks/useDebounce';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedSearchQuery)}`);
    }
  }, [debouncedSearchQuery, navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Movies', path: '/search', icon: <MovieIcon /> },
    { text: 'TV Shows', path: '/tv', icon: <LiveTvIcon /> },
    { text: 'People', path: '/people', icon: <PeopleIcon /> },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#211212', boxShadow: 2 }}>
      <Toolbar>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <img src="/assets/logo.png" alt="CineScope Logo" style={{ width: 28, height: 28 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff', letterSpacing: 0.5 }}>
              CineScope
            </Typography>
          </Box>
        </Link>

        {/* Nav Links - now directly after logo */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 4 }}>
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#fff',
                    fontWeight: 500,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    transition: 'background 0.2s',
                    '&:hover': { bgcolor: '#472426', color: 'primary.main' },
                  }}
                >
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Search Bar and My List Icon */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, gap: 2 }}>
            <Box component="form" onSubmit={handleSearchSubmit} sx={{ mr: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#472426', borderRadius: 2, px: 1.5, py: 0.5 }}>
                <SearchIcon sx={{ color: '#fff', fontSize: 20, mr: 1 }} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    fontSize: '1rem',
                    width: 100,
                    padding: '4px 0',
                  }}
                />
              </Box>
            </Box>
            <IconButton component={Link} to="/mylist" sx={{
              p: '4px',
              bgcolor: '#472426',
              borderRadius: '8px',
              ml: 1,
              '&:hover': { bgcolor: '#5a2d2f' },
              boxShadow: 1,
              transition: 'background 0.2s',
            }}>
              <img src="/assets/mylisticon.png" alt="My List" style={{ width: 28, height: 28 }} />
            </IconButton>
            <IconButton sx={{ p: 0.5, ml: 1 }}>
              <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="User" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            </IconButton>
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <Box sx={{ width: 250, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Menu</Typography>
              <IconButton onClick={handleMenuClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Mobile Search */}
            <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />, 
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#472426',
                  }
                }}
              />
            </Box>

            {/* Mobile Menu Items */}
            <List>
              {menuItems.map((item) => (
                <ListItem 
                  key={item.path} 
                  button 
                  component={Link} 
                  to={item.path}
                  onClick={handleMenuClose}
                >
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ sx: { display: 'flex', alignItems: 'center', gap: 1 } }}
                  />
                  {item.icon}
                </ListItem>
              ))}
              {/* My List Icon for mobile */}
              <ListItem button component={Link} to="/mylist" onClick={handleMenuClose}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#472426',
                  borderRadius: '8px',
                  p: '4px',
                  mr: 1.5,
                  boxShadow: 1,
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: '#5a2d2f' },
                }}>
                  <img src="/assets/mylisticon.png" alt="My List" style={{ width: 28, height: 28 }} />
                </Box>
                <ListItemText primary="My List" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;