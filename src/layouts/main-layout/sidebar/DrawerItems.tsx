import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Image from 'components/base/Image';
import CollapseListItem from './list-items/CollapseListItem';
import ProfileListItem from './list-items/ProfileListItem';
import ListItem from './list-items/ListItem';
import LogoImg from 'assets/images/Logo.png';
import { topListData, bottomListData, profileListData } from 'data/sidebarListData';
import { useUser } from 'routes/context/UserContext';

const DrawerItems = () => {
  const { user } = useUser();

  return (
    <>
      <Stack
        pt={5}
        pb={4}
        px={3.5}
        position={'sticky'}
        top={0}
        bgcolor="info.darker"
        alignItems="center"
        justifyContent="flex-start"
        zIndex={1000}
      >
        <ButtonBase component={Link} href="/" disableRipple>
          <Image src={LogoImg} alt="logo" height={24} width={24} sx={{ mr: 1 }} style={{ borderRadius: '50%' }} />
          <Typography variant="h5" color="text.primary" fontWeight={600} letterSpacing={1}>
            {user.username}
          </Typography>
        </ButtonBase>
      </Stack>

      <List component="nav" sx={{ px: 2.5 }}>
        {topListData.map((route, index) => (
          <ListItem key={index} {...route} />
        ))}
      </List>

      <Divider />

      <List component="nav" sx={{ px: 2.5 }}>
        {bottomListData.map((route) => (
          route.items ? <CollapseListItem key={route.id} {...route} /> : <ListItem key={route.id} {...route} />
        ))}
      </List>

      <List component="nav" sx={{ px: 2.5 }}>
        {profileListData && <ProfileListItem {...profileListData} />}
      </List>
    </>
  );
};

export default DrawerItems;
