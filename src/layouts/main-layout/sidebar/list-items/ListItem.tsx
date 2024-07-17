import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MenuItem } from 'routes/sitemap';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'components/base/IconifyIcon';

const ListItem = ({ subheader, icon, path }: MenuItem) => {
  const location = useLocation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(location.pathname === path);
  }, [location.pathname, path]);

  return (
    <ListItemButton
      component={Link}
      href={path}
      sx={{ opacity: active ? 1 : 0.8 }}
    >
      <ListItemIcon>
        {icon && (
          <IconifyIcon
            icon={icon}
            sx={{
              color: active ? 'primary.main' : null,
            }}
          />
        )}
      </ListItemIcon>
      <ListItemText
        primary={subheader}
        sx={{
          '& .MuiListItemText-primary': {
            color: active ? 'primary.main' : null,
          },
        }}
      />
    </ListItemButton>
  );
};

export default ListItem;
