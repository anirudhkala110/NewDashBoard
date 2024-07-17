import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { fontFamily } from 'theme/typography';

interface LegendProps {
  data: {
    id: number;
    type: string;
    color: string; // Color prop added for each legend item
  };
  isActive: boolean; // Whether legend item is active or not
  handleLegendToggle: (seriesName: string) => void;
}

const RevenueChartLegend = ({ data, isActive, handleLegendToggle }: LegendProps) => {
  const handleClick = () => {
    handleLegendToggle(data.type);
  };

  const color = isActive ? data.color : 'text.secondary'; // Apply active color or default color

  return (
    <ButtonBase onClick={handleClick} disableRipple>
      <Stack spacing={0.5} alignItems="center">
        <Box height={8} width={8} bgcolor={color} borderRadius={1} />
        <Typography variant="body2" color="text.secondary" fontFamily={fontFamily.workSans}>
          {data.type}
        </Typography>
      </Stack>
    </ButtonBase>
  );
};

export default RevenueChartLegend;
