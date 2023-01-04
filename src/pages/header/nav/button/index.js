import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Clickable from '../../../../components/clickable';

import './index.css';

// header navigation bar button

const urlize = (text) => text.toLowerCase().replaceAll(/\s+/g, '-');

const Button = ({ icon = <></>, text = '' }) => {
  const location = useLocation();

  return (
    <Clickable
      className='nav_button size_medium'
      to={'/' + urlize(text)}
      icon={icon}
      text={text}
      flip
      data-active={location.pathname.toLowerCase().includes(urlize(text))}
    />
  );
};

Button.propTypes = {
  location: PropTypes.object,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
