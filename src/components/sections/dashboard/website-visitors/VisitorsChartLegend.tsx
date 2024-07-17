import { fontFamily } from 'theme/typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

interface LegendProps {
  data: {
    id: number;
    type: string;
    rate: string;
  };
  toggleColor: {
    type0: boolean;
    type1: boolean;
    type2: boolean;
  };
  handleToggleLegend: (e: React.MouseEvent<HTMLButtonElement>, type: string | null) => void;
}

const VisitorsChartLegend = ({ data, toggleColor, handleToggleLegend }: LegendProps) => {
  let color = 'white';

  if (toggleColor.type0 && data.type === 'Type 1') {
    color = '#5470C6';
  } else if (toggleColor.type1 && data.type === 'Type 2') {
    color = '#91CC75';
  } else if (toggleColor.type2 && data.type === 'Type 3') {
    color = '#FAC858';
  } else {
    color = 'text.secondary';
  }

  return (
    <Stack alignItems="center" justifyContent="space-between">
      <ButtonBase onClick={(e) => handleToggleLegend(e, data.type)} disableRipple>
        <Stack spacing={1} alignItems="center">
          <Box height={8} width={8} bgcolor={color} borderRadius={1} />
          <Typography variant="body1" color="text.primary" fontFamily={fontFamily.workSans}>
            {data.type}
          </Typography>
        </Stack>
      </ButtonBase>
      <Typography variant="body1" color="text.primary" fontFamily={fontFamily.workSans}>
        {data.rate}
      </Typography>
    </Stack>
  );
};

export default VisitorsChartLegend;
