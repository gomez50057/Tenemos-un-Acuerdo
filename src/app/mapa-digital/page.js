import React from 'react';
import ProjectMap from '@/components/maps/ProjectMap';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const map = () => {
  return (
    <div>
      <Navbar />
      <ProjectMap />
      <Footer />
    </div>
  );
};

export default map;
