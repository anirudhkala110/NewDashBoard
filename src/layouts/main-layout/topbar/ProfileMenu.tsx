import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';
import AvatarImage from 'assets/images/avater.png';
import { useUser } from 'routes/context/UserContext';
import axios from 'axios';

interface MenuItems {
  id: number;
  title: string;
  icon: string;
}

const menuItems: MenuItems[] = [
  {
    id: 1,
    title: 'View Profile',
    icon: 'mingcute:user-2-fill',
  },
  {
    id: 2,
    title: 'Account Settings',
    icon: 'material-symbols:settings-account-box-rounded',
  },
  {
    id: 3,
    title: 'Notifications',
    icon: 'ion:notifications',
  },
  {
    id: 4,
    title: 'Switch Account',
    icon: 'material-symbols:switch-account',
  },
  {
    id: 5,
    title: 'Help Center',
    icon: 'material-symbols:live-help',
  },
  {
    id: 6,
    title: 'Logout',
    icon: 'material-symbols:logout',
  },
];

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.get('http://localhost:5021/logout')
      .then(res => {
        if (res.data.msg_type === 'good') {
          window.location.reload(); // Reload the page
        }
      }
      )
      .catch(err => console.log(err));
  }

  const handleRoute = (path: string) => {
    navigate(path);
  }

  const userData = useUser();
  console.log(userData)

  return (
    <>
      <Tooltip title="Profile">
        <ButtonBase onClick={handleProfileClick} disableRipple>
          <Stack
            spacing={1}
            alignItems="center"
            aria-controls={open ? 'account-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
          >
            <Avatar
              src={`http://localhost:5021/Images/${userData.user.profilePic}`}
              sx={(theme) => ({
                ml: 0.8,
                height: 32,
                width: 32,
                bgcolor: theme.palette.primary.main,
              })}
            />
            <Typography variant="subtitle2">{userData.user.username}</Typography>
          </Stack>
        </ButtonBase>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            p: '0 !important',
            width: 240,
            overflow: 'hidden',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { bgcolor: 'info.main' } }}>
          <Avatar
            src={`http://localhost:5021/Images/${userData.user.profilePic}`}
            sx={{
              bgcolor: 'primary.main',
            }}
          />
          <Stack direction="column">
            <Typography variant="body2" fontWeight={500}>
              {userData.user.username}
            </Typography>
            <Typography variant="caption" fontWeight={400} color="text.secondary">
              {userData.user.email}
            </Typography>
            <Typography variant="caption" fontWeight={400} className='rounded px-1 text-white fw-bold shadow' color="text.secondary" style={{ background: '#5470C6', maxWidth: 'min-content' }}>
              {userData.user.role}
            </Typography>
          </Stack>
        </MenuItem>

        <Divider className='text-white' />
        <MenuItem onClick={() => handleRoute('/pages/user_info')} sx={{ py: 1 }}>
          <ListItemIcon sx={{ mr: 2, fontSize: 'button.fontSize' }}>
            <IconifyIcon icon={'mingcute:user-2-fill'} />
          </ListItemIcon>
          <Typography variant="body2" color="text.secondary">
            {'View Profile'}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleRoute('/pages/user_info')} sx={{ py: 1 }}>
          <ListItemIcon sx={{ mr: 2, fontSize: 'button.fontSize' }}>
            <IconifyIcon icon={'material-symbols:settings-account-box-rounded'} />
          </ListItemIcon>
          <Typography variant="body2" color="text.secondary">
            {'Account Settings'}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
          <ListItemIcon sx={{ mr: 2, fontSize: 'button.fontSize' }}>
            <IconifyIcon icon={'material-symbols:logout'} />
          </ListItemIcon>
          <Typography variant="body2" color="text.secondary">
            {'Logout'}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
