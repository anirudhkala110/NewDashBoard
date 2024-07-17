import { MenuItem } from 'routes/sitemap';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import AvatarImage from 'assets/images/avater.png';
import { useUser } from 'routes/context/UserContext';

const ProfileListItem = ({ subheader, path }: MenuItem) => {
  const userData = useUser()
  return (
    <ListItemButton component={Link} href={path}>
      <Stack spacing={1} alignItems="center">
        <Avatar
          src={`http://localhost:5021/Images/${userData.user.profilePic}`}
          sx={{ height: 36, width: 36, bgcolor: 'primary.main' }} />
        <Stack direction="column">
          <Typography variant="subtitle2" color="text.primary" letterSpacing={0.5}>
            {subheader}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={400}>
            Profile
          </Typography>
        </Stack>
      </Stack>
    </ListItemButton>
  );
};

export default ProfileListItem;
