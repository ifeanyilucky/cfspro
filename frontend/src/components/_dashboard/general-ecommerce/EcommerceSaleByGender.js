import { merge } from 'lodash';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

// ----------------------------------------------------------------------

const CHART_DATA = [44, 75];

export default function EcommerceSaleByGender() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Sale By Gender" />
    </Card>
  );
}
