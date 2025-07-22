import { Box, Typography } from '@mui/material';

interface IndicatorUIProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconBg?: string;
}

const IndicatorUI = ({ title, description, icon, iconBg }: IndicatorUIProps) => (
  <Box
    sx={{
      background: iconBg,
      borderRadius: 3,
      p: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      boxShadow: 2,
      color: '#fff',
      minHeight: 90,
    }}
  >
    <Box
      sx={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        padding: 1,
        border: '2px solid #fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: '#fff' }}>{description}</Typography>
    </Box>
  </Box>
);

export default IndicatorUI;