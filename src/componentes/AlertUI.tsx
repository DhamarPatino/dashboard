import Alert from '@mui/material/Alert';

interface AlertConfig {
  description: string;
}

const AlertUI = ({ config }: { config: AlertConfig }) => (
  <Alert severity="success" variant="outlined">
    {config.description}
  </Alert>
);

export default AlertUI;
