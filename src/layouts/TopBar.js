import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const TopBar = () => {
  return (
    <>
      <div className="top-bar">
        <div className="top-bar-content text-center bg-white fixed-top py-3">
          <h5>School Bus Management System</h5>
        </div>
      </div>
    </>
  );
};

export default TopBar;
