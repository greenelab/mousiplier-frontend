import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Clickable from '../../../../components/clickable';

import './index.css';

// header navigation bar button

const Button = ({ icon = <></>, text = '', link='' }) => {
  const location = useLocation();

  return (
    <Clickable
      className='nav_button size_medium'
      to={'/' + (link === '' ? text.toLowerCase() : link)}
      icon={icon}
      text={text}
      flip
      data-active={location.pathname.toLowerCase().includes(text.toLowerCase())}
    />
  );
};

Button.propTypes = {
  location: PropTypes.object,
  link: PropTypes.string,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
