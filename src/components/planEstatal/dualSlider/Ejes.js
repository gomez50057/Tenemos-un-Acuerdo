// components/PlanEstatal/ejes/Ejes.js
"use client";

import React from 'react';
import SliderBase from './DualSlider';
import { ejesPlanEstatal } from '../../../utils/planEstal';

const Ejes = () => {
  return <SliderBase items={ejesPlanEstatal} animateDirection="normal" />;
};

export default Ejes;
