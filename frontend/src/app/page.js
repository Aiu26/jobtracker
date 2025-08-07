'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import JobSearchFilters from '../components/JobSearchFilters';
import JobCards from '../components/JobCards';
import { JobsProvider } from '../context/JobsContext';
import { JobFilterProvider } from '../context/JobFilterContext';

export default function Home() {
  return (
    <JobsProvider>
      <JobFilterProvider>
        <Navbar />
        <JobSearchFilters />
        <JobCards />
      </JobFilterProvider>
    </JobsProvider>
  );
}