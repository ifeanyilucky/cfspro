import PropTypes from 'prop-types';
// material

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Collapse, Container } from '@mui/material';
import { TreeView, TreeItem, treeItemClasses } from '@mui/lab';
// routes

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const TreeViewStyle = styled(TreeView)({
  height: 240,
  flexGrow: 1,
  maxWidth: 400
});

// ----------------------------------------------------------------------

TransitionComponent.propTypes = {
  in: PropTypes.bool
};

function TransitionComponent(props) {
  return (
    <div>
      <Collapse {...props} />
    </div>
  );
}

const StyledTreeItem = styled((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />)(
  ({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      '& .close': {
        opacity: 0.3
      }
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
    }
  })
);

export default function TreesViewComponent() {
  return (
    <RootStyle title="Components: Tree View">
      <Container maxWidth="lg">
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
          <Block title="Basic">
            <TreeViewStyle
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              defaultEndIcon={null}
            >
              <TreeItem nodeId="1" label="Applications">
                <TreeItem nodeId="2" label="Calendar" />
                <TreeItem nodeId="3" label="Chrome" />
                <TreeItem nodeId="4" label="Webstorm" />
              </TreeItem>
              <TreeItem nodeId="5" label="Documents">
                <TreeItem nodeId="10" label="OSS" />
                <TreeItem nodeId="6" label="Material-UI">
                  <TreeItem nodeId="7" label="src">
                    <TreeItem nodeId="8" label="index.js" />
                    <TreeItem nodeId="9" label="tree-view.js" />
                  </TreeItem>
                </TreeItem>
              </TreeItem>
            </TreeViewStyle>
          </Block>

          <Block title="Multi Select">
            <TreeViewStyle
              multiSelect
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              defaultEndIcon={null}
            >
              <TreeItem nodeId="1" label="Applications">
                <TreeItem nodeId="2" label="Calendar" />
                <TreeItem nodeId="3" label="Chrome" />
                <TreeItem nodeId="4" label="Webstorm" />
              </TreeItem>
              <TreeItem nodeId="5" label="Documents">
                <TreeItem nodeId="6" label="Material-UI">
                  <TreeItem nodeId="7" label="src">
                    <TreeItem nodeId="8" label="index.js" />
                    <TreeItem nodeId="9" label="tree-view.js" />
                  </TreeItem>
                </TreeItem>
              </TreeItem>
            </TreeViewStyle>
          </Block>

          <Block title="Customization">
            <TreeViewStyle defaultExpanded={['1']}>
              <StyledTreeItem nodeId="1" label="Main">
                <StyledTreeItem nodeId="2" label="Hello" />
                <StyledTreeItem nodeId="3" label="Subtree with children">
                  <StyledTreeItem nodeId="6" label="Hello" />
                  <StyledTreeItem nodeId="7" label="Sub-subtree with children">
                    <StyledTreeItem nodeId="9" label="Child 1" />
                    <StyledTreeItem nodeId="10" label="Child 2" />
                    <StyledTreeItem nodeId="11" label="Child 3" />
                  </StyledTreeItem>
                  <StyledTreeItem nodeId="8" label="Hello" />
                </StyledTreeItem>
                <StyledTreeItem nodeId="4" label="World" />
                <StyledTreeItem nodeId="5" label="Something something" />
              </StyledTreeItem>
            </TreeViewStyle>
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
