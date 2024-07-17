import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import VisitorsChartLegend from './VisitorsChartLegend';
import EChartsReactCore from 'echarts-for-react/lib/core';

interface LegendsProps {
  chartRef: React.RefObject<EChartsReactCore>;
  deviceData: Array<{ id: number; deviceid: string; userID: string; version: number; type: number; /* other fields */ }>;
}

const VisitorsChartLegends = ({ chartRef, deviceData }: LegendsProps) => {
  const theme = useTheme();
  // console.log("Device Data ", deviceData);

  const type1 = deviceData.filter(data => data.type === 0);
  const type2 = deviceData.filter(data => data.type === 1);
  const type3 = deviceData.filter(data => data.type === 2);

  // console.log('Type 1 Devices:', type1);
  // console.log('Type 2 Devices:', type2);
  // console.log('Type 3 Devices:', type3);

  const legendsData = [
    {
      id: 1,
      type: 'Type 1',
      rate: `${((type1.length / deviceData.length) * 100).toFixed(3)}%`,
    },
    {
      id: 2,
      type: 'Type 2',
      rate: `${((type2.length / deviceData.length) * 100).toFixed(3)}%`,
    },
    {
      id: 3,
      type: 'Type 3',
      rate: `${((type3.length / deviceData.length) * 100).toFixed(3)}%`,
    },
  ];
  

  const [toggleColor, setToggleColor] = useState({
    type1: true,
    type2: true,
    type3: true,
  });

  useEffect(() => {
    const handleBodyClick = (e: MouseEvent) => {
      handleToggleLegend(e as unknown as React.MouseEvent, null);
    };
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  const getActiveColor = (type: string) => {
    if (type === 'Type 1') {
      return theme.palette.primary.main;
    } else if (type === 'Type 2') {
      return theme.palette.secondary.lighter;
    } else if (type === 'Type 3') {
      return theme.palette.secondary.main;
    }
  };

  const getDisableColor = (type: string) => {
    if (type === 'Type 1') {
      return theme.palette.primary.dark;
    } else if (type === 'Type 2') {
      return theme.palette.secondary.darker;
    } else if (type === 'Type 3') {
      return theme.palette.secondary.dark;
    }
  };

  const handleToggleLegend = (e: React.MouseEvent, type: string | null) => {
    e.stopPropagation();
    const echartsInstance = chartRef.current?.getEchartsInstance();
    if (!echartsInstance) return;

    const option = echartsInstance.getOption() as echarts.EChartsOption;

    if (type === 'Type 1') {
      setToggleColor({ type1: true, type2: false, type3: false });
    } else if (type === 'Type 2') {
      setToggleColor({ type1: false, type2: true, type3: false });
    } else if (type === 'Type 3') {
      setToggleColor({ type1: false, type2: false, type3: true });
    } else {
      setToggleColor({ type1: true, type2: true, type3: true });
    }

    if (Array.isArray(option.series)) {
      const series = option.series.map((s) => {
        if (Array.isArray(s.data)) {
          s.data.forEach((item) => {
            if (type !== null && item.itemStyle && item.itemStyle.color) {
              if (type === item.type) {
                item.itemStyle.color = getActiveColor(item.type);
              } else {
                item.itemStyle.color = getDisableColor(item.type);
              }
            } else {
              item.itemStyle.color = getActiveColor(item.type);
            }
          });
        }
        return s;
      });

      echartsInstance.setOption({ series });
    }
  };

  return (
    <Stack mt={1} spacing={3} direction="column">
      {legendsData.map((item) => (
        <VisitorsChartLegend
          key={item.id}
          data={item}
          toggleColor={toggleColor}
          handleToggleLegend={handleToggleLegend}
          className='text-white'
        />
      ))}
    </Stack>
  );
};

export default VisitorsChartLegends;
