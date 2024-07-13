import { fontFamily } from 'theme/typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'components/base/Image';
import iPhone from 'assets/images/iPhone.png';

interface ProductInfoProps {
  item: {
    imageUrl: string;
    address: string;
    data: number | string;
    version: number | string;
  };
}

const Product = ({ item }: ProductInfoProps) => {
  const { address, data, version } = item;

  return (
    <Stack alignItems="center" justifyContent="space-between">
      <Stack spacing={2} alignItems="center">
        <Box height={46} width={46} bgcolor="info.dark" borderRadius={1.25}>
          <Image src={iPhone} height={1} width={1} sx={{ objectFit: 'contain' }} />
        </Box>

        <Stack direction="column">
          <Typography variant="body2" fontWeight={600}>
            {address}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {data}
          </Typography>
        </Stack>
      </Stack>

      <Typography variant="caption" fontWeight={400} fontFamily={fontFamily.workSans}>
        $ {version}
      </Typography>
    </Stack>
  );
};

export default Product;
