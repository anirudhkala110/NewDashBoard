import Chip from '@mui/material/Chip';
import IconifyIcon from 'components/base/IconifyIcon';

interface StatusChipProps {
  status: 'Working' | 'Error' | 'Off';
}

const StatusChip = ({ status }: StatusChipProps) => {
  return (
    <Chip
      variant="outlined"
      size="small"
      icon={
        <IconifyIcon
          icon="radix-icons:dot-filled"
          sx={(theme) => ({
            color:
              status === 'Working'
                ? `${theme.palette.success.main} !important`
                : status === 'Off'
                  ? `${theme.palette.warning.main} !important`
                  : `${theme.palette.error.main} !important`,
          })}
        />
      }
      label={status}
      sx={{
        pr: 0.65,
        width: 80,
        justifyContent: 'center',
        color:
          status === 'Working'
            ? 'success.main'
            : status === 'Off'
              ? 'warning.main'
              : 'error.main',
        letterSpacing: 0.5,
        bgcolor:
          status === 'Working'
            ? 'transparent.success.main'
            : status === 'Off'
              ? 'transparent.warning.main'
              : 'transparent.error.main',
        borderColor:
          status === 'Working'
            ? 'transparent.success.main'
            : status === 'Off'
              ? 'transparent.warning.main'
              : 'transparent.error.main',
      }}
    />
  );
};

export default StatusChip;
