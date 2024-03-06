import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { IconPlus } from '@tabler/icons-react';
import { Card, CardContent, CardHeader, Divider, Typography, Button} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// constants
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
  display: 'flex', // Add display flex to the CardHeader
  justifyContent: 'space-between',
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      shadow,
      sx = {},
      title,
      subtitle,
      buttonname,
      redirectlink,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {title && (
          <CardHeader sx={headerSX} title={darkTitle ? <Typography variant="h3">{title}</Typography> : title} action={buttonname && <Button variant="contained" color="primary" component={RouterLink} to={redirectlink} startIcon={<IconPlus />}>{buttonname}</Button>}>
            {subtitle && <Typography variant="subtitle2">{subtitle}</Typography>}
          </CardHeader>
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
