// material
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { styled } from '@mui/material/styles';
import { Box, Link, Grid, Container, Typography, Breadcrumbs } from '@mui/material';
// routes

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MBreadcrumbs } from '../../../components/@material-extend';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function BreadcrumbComponent() {
  return (
    <RootStyle title="Components: Breadcrumbs">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Block title="Text" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Breadcrumbs>
                <Link color="inherit" href="#">
                  Material-UI
                </Link>
                <Link color="inherit" href="#">
                  Core
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Breadcrumb</Typography>
              </Breadcrumbs>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="With Icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Breadcrumbs>
                <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                  <HomeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  Material-UI
                </Link>
                <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                  <WhatshotIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  Core
                </Link>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary'
                  }}
                >
                  <GrainIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  Breadcrumb
                </Typography>
              </Breadcrumbs>
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Customized" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MBreadcrumbs
                links={[
                  { name: 'Home', href: '#', icon: <HomeIcon /> },
                  { name: 'Link1', href: '#', icon: <WhatshotIcon /> },
                  { name: 'Link2', href: '#', icon: <WhatshotIcon /> },
                  { name: 'Link3', href: '#', icon: <WhatshotIcon /> },
                  { name: 'Link4', href: '#', icon: <WhatshotIcon /> },
                  { name: 'Link5', href: '#', icon: <WhatshotIcon /> }
                ]}
              />
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
