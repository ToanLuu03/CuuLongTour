import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SeeMore_Button({ link }) {
    return (

        <Link to={link} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" fullWidth>
                See more
            </Button>
        </Link>
    )
}
// Add prop types validation
SeeMore_Button.propTypes = {
    link: PropTypes.string
};

export default SeeMore_Button