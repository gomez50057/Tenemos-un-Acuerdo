// components/PlanEstatal/transversales/Transversales.js
"use client";

import React from 'react';
import SliderBase from './DualSlider';
import { TransversalesPlanEstatal } from '../../../utils/planEstal';

const Transversales = () => {
  return <SliderBase items={TransversalesPlanEstatal} animateDirection="reverse" />;
};

export default Transversales;
