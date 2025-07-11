import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SeeMore_Button({ link, style, sx, children }) {
    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <Button
                variant="outlined"
                fullWidth
                style={style}
                sx={sx}
            >
                {children || "See more"}
            </Button>
        </Link>
    );
}

SeeMore_Button.propTypes = {
    link: PropTypes.string,
    style: PropTypes.object,
    sx: PropTypes.object,
    children: PropTypes.node,
};

export default SeeMore_Button;