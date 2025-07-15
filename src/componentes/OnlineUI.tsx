import { Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
export function OnlineUI() {
    return (<Box
                    sx={{
                      background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      boxShadow: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      letterSpacing: 1,
                      border: 'none',
                      width: 'fit-content'
                    }}
                  >
                    <FiberManualRecordIcon
                      sx={{
                        color: '#bbf7d0',
                        fontSize: 18,
                        mr: 1,
                        animation: 'pulse 1.2s infinite',
                        '@keyframes pulse': {
                          '0%': { opacity: 1, transform: 'scale(1)' },
                          '50%': { opacity: 0.5, transform: 'scale(1.3)' },
                          '100%': { opacity: 1, transform: 'scale(1)' }
                        }
                      }}
                    />
                    En&nbsp;vivo
                  </Box>
                  )
}
export default OnlineUI;