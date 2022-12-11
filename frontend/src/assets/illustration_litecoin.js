// material
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function LitecoinIllustration({ ...other }) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;

  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill={PRIMARY_MAIN}
          d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm-.262 3.678h2.584a.343.343 0 0 1 .33.435l-2.03 6.918l1.905-.582l-.408 1.385l-1.924.56l-1.248 4.214h6.676a.343.343 0 0 1 .328.437l-.582 2a.459.459 0 0 1-.44.33H6.733l1.723-5.822l-1.906.58l.42-1.361l1.91-.58l2.422-8.18a.456.456 0 0 1 .437-.334Z"
        />
      </svg>
    </Box>
  );
}
