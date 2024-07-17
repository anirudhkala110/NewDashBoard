import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuItem } from 'routes/sitemap';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'components/base/IconifyIcon';

const CollapseListItem = ({ subheader, items, icon }: MenuItem) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isActive = items?.some(item => location.pathname === item.path);
    setActive(isActive);
    setOpen(isActive);
  }, [location.pathname, items]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {icon && (
            <IconifyIcon
              icon={icon}
              sx={{
                color: active ? 'primary.main' : null,
              }}
              style={{background: `${active ? 'white' : null}`}}
            />
          )}
        </ListItemIcon>
        <ListItemText
          primary={subheader}
          sx={{
            '& .MuiListItemText-primary': {
              color: active ? 'primary.main' : null,
              background:active ? 'primary.main' : null,
            },
          }}
        />
        <IconifyIcon
          icon="iconamoon:arrow-right-2-duotone"
          color="neutral.dark"
          sx={{
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease-in-out',
          }}
        />
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items?.map((route) => (
            <ListItemButton
              key={route.pathName}
              component={Link}
              href={route.path}
              sx={{
                pl: 1.75,
                borderLeft: 4,
                borderStyle: 'solid',
                borderColor: location.pathname === route.path ? 'primary.main' : 'transparent !important',
                bgcolor: location.pathname === route.path ? 'info.dark' : 'info.darker',
              }}
            >
              <ListItemText
                primary={route.name}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: location.pathname === route.path ? 'text.primary' : 'text.secondary',
                    background:location.pathname === route.path ? 'primary.main' : null,
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapseListItem;
