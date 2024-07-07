import { GridRowsProp } from '@mui/x-data-grid';
import { formatNumber } from 'functions/formatNumber';

export const ordersStatusData: GridRowsProp = [
  {
    id: '#1532',
    client: { name: 'Anirudh Kala', email: 'anirudhkala110@gmail.com' },
    date: new Date('Jan 30, 2024'),
    status: 'Working',
    country: 'India',
    total: formatNumber(1099.24),
  },
  {
    id: '#1531',
    client: { name: 'Sophie Moore', email: 'contact@sophiemoore.com' },
    date: new Date('Jan 27, 2024'),
    status: 'Error',
    country: 'United Kingdom',
    total: formatNumber(5870.32),
  },
  {
    id: '#1530',
    client: { name: 'Matt Cannon', email: 'info@mattcannon.com' },
    date: new Date('Jan 24, 2024'),
    status: 'Working',
    country: 'Australia',
    total: formatNumber(13899.48),
  },
  {
    id: '#1529',
    client: { name: 'Graham Hills', email: 'hi@grahamhills.com' },
    date: new Date('Jan 21, 2024'),
    status: 'Off',
    country: 'India',
    total: formatNumber(1569.12),
  },
  {
    id: '#1528',
    client: { name: 'Sandy Houston', email: 'contact@sandyhouston.com' },
    date: new Date('Jan 18, 2024'),
    status: 'Working',
    country: 'Canada',
    total: formatNumber(899.16),
  },
  {
    id: '#1527',
    client: { name: 'Andy Smith', email: 'hello@andysmith.com' },
    date: new Date('Jan 15, 2024'),
    status: 'Off',
    country: 'United States',
    total: formatNumber(2449.64),
  },
  {
    id: '#1526',
    client: { name: 'Emma Grace', email: 'wow@emmagrace.com' },
    date: new Date('Jan 12, 2024'),
    status: 'Working',
    country: 'Australia',
    total: formatNumber(6729.82),
  },
  {
    id: '#1525',
    client: { name: 'Ava Rose', email: 'me@avarose.com' },
    date: new Date('Jan 09, 2024'),
    status: 'Error',
    country: 'Canada',
    total: formatNumber(784.94),
  },
  {
    id: '#1524',
    client: { name: 'Olivia Jane', email: 'info@oliviajane.com' },
    date: new Date('Jan 06, 2024'),
    status: 'Off',
    country: 'Singapur',
    total: formatNumber(1247.86),
  },
  {
    id: '#1523',
    client: { name: 'Mason Alexander', email: 'myinfo@alexander.com' },
    date: new Date('Jan 03, 2024'),
    status: 'Working',
    country: 'United States',
    total: formatNumber(304.89),
  },
  {
    id: '#1522',
    client: { name: 'Samuel David', email: 'me@samueldavid.com' },
    date: new Date('Jan 01, 2024'),
    status: 'Off',
    country: 'Japan',
    total: formatNumber(2209.76),
  },
  {
    id: '#1521',
    client: { name: 'Henry Joseph', email: 'contact@henryjoseph.com' },
    date: new Date('Dec 28, 2023'),
    status: 'Working',
    country: 'North Korea',
    total: formatNumber(5245.68),
  },
];
