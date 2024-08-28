import React from "react";

import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";
import FilterTags from "../Components/FilterTags";
import CoursesSection from "../Components/ListOfCourses";
import FeatureSection from "../Components/FeatureSection";
import TopEducators from "../Components/FeaturedTeachers";
import CallToAction from "../Components/CallToAction";

const Home = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <FilterTags />
      <CoursesSection />
      <FeatureSection />
      <TopEducators />
      <CallToAction />
    </>
  );
};

export default Home;
