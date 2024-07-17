import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface DateSelectProps {
  onChange: (value: string) => void;
}

const DateSelect: React.FC<DateSelectProps> = ({ onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl variant="outlined" size="small">
      <InputLabel>Time Frame</InputLabel>
      <Select defaultValue="all" onChange={handleChange} label="Time Frame">
        <MenuItem value="month">This Month</MenuItem>
        <MenuItem value="year">This Year</MenuItem>
        <MenuItem value="all">All Time</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DateSelect;
