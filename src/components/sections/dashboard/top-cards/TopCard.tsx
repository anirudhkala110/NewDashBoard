import { fontFamily } from 'theme/typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import IconifyIcon from 'components/base/IconifyIcon';
import RateChip from 'components/chips/RateChip';

interface TopCardProps {
  icon: string;
  title: string;
  value: string;
  rate: string;
  isUp: boolean;
  onClick?: () => void;  // Add onClick prop
}

const TopCard = (props: TopCardProps) => {
  const { title, value, rate, isUp, icon, onClick } = props; // Destructure onClick

  return (
    <Grid item xs={12} sm={6} xl={3} md={6}>
      <Stack
        p={2.25}
        pl={2.5}
        direction="column"
        component={Paper}
        gap={1.5}
        height={116}
        style={{ minWidth: "280px", width: '100%', cursor: onClick ? 'pointer' : 'default' }} // Add cursor pointer if onClick is provided
        onClick={onClick} // Attach onClick event
      >
        <Stack justifyContent="space-between">
          <Stack alignItems="center" gap={1}>
            {title === "Total Devices" && <><IconifyIcon icon={icon} color="primary.main" fontSize={"25px"}/></>}
            {title === "Total Revenue" && <i color="primary.main" className={`${icon}`} style={{ color: '#CB3CFF', fontSize: '25px' }}></i>}
            {title === "Devices Sell" && <i className={`${icon}`} style={{ color: '#CB3CFF', fontSize: '25px' }}></i>}
            {title === "Type of Products" && <i className={`${icon}`} style={{ color: '#CB3CFF', fontSize: '25px' }}></i>}
            <Typography variant="subtitle2" color="text.secondary" fontFamily={fontFamily.workSans}>
              {title}
            </Typography>
          </Stack>
          <IconButton
            aria-label="menu"
            size="small"
            sx={{ color: 'neutral.light', fontSize: 'h5.fontSize' }}
          >
            {title === "Total Devices" && <><i className='bi bi-plus' style={{ fontSize: '25px', color: '#CB3CFF' }}></i></>}
            {/* <IconifyIcon icon="solar:menu-dots-bold" /> */}
          </IconButton>
        </Stack>
        <Stack alignItems="center" gap={0.875}>
          <Typography variant="h3" fontWeight={600} letterSpacing={1}>
            {value}
          </Typography>
          <RateChip rate={rate} isUp={isUp} />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default TopCard;
