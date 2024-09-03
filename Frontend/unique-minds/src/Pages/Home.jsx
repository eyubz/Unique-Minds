import React from "react";

import Header from "../Components/Header";
import FeatureSection from "../Components/Home/FeatureSection";
import TopEducators from "../Components/Home/FeaturedTeachers";
import CallToAction from "../Components/Home/CallToAction";

const Home = () => {
  return (
    <>
      <Header />
      <FeatureSection />
      <TopEducators />
      <CallToAction />
    </>
  );
};

export default Home;
