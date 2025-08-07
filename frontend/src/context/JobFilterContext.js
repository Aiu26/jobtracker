"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useJobs } from "./JobsContext";

const JobFilterContext = createContext();

export const useJobFilter = () => {
	const context = useContext(JobFilterContext);
	if (!context) {
		throw new Error("useJobFilter must be used within a JobFilterProvider");
	}
	return context;
};

export const JobFilterProvider = ({ children }) => {
	const { jobs, loading, error, refreshJobs } = useJobs();
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [filters, setFilters] = useState({
		searchQuery: "",
		location: "",
		jobType: "",
		salaryRange: [10, 200], // Default range in LPA
	});

	// Function to extract numeric value from salary string (e.g., "12LPA" -> 12)
	const extractSalaryValue = (salaryString) => {
		const match = salaryString.match(/(\d+)LPA/);
		return match ? parseInt(match[1]) : 0;
	};

	// Filter jobs based on current filters
	const filterJobs = (jobs, filters) => {
		let filtered = [...jobs];
		console.log("🔍 Filtering jobs:", filtered, filters);

		// Filter by search query (job title, company name)
		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			filtered = filtered.filter(
				(job) =>
					job.jobTitle.toLowerCase().includes(query) ||
					job.companyName.toLowerCase().includes(query)
			);
		}

		// Filter by location
		if (filters.location) {
			filtered = filtered.filter(
				(job) =>
					job.location.toLowerCase() ===
					filters.location.toLowerCase()
			);
		}

		// Filter by job type
		if (filters.jobType) {
			filtered = filtered.filter(
				(job) =>
					job.jobType.toLowerCase() === filters.jobType.toLowerCase()
			);
		}

		// Filter by salary range (convert from backend format to LPA)
		filtered = filtered.filter((job) => {
			const minSalaryLPA = parseInt(job.minSalary);
			const maxSalaryLPA = parseInt(job.maxSalary);
			const avgSalaryLPA = (minSalaryLPA + maxSalaryLPA) / 2;
			return (
				avgSalaryLPA >= filters.salaryRange[0] * 1000 &&
				avgSalaryLPA <= filters.salaryRange[1] * 1000
			);
		});

		console.log("🔍 Filtered jobs:", filtered);

		setFilteredJobs(filtered);
	};

	// Update filters
	const updateFilters = (newFilters) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	// Reset all filters
	const resetFilters = () => {
		setFilters({
			searchQuery: "",
			location: "",
			jobType: "",
			salaryRange: [10, 200],
		});
	};

	// Apply filters whenever filters change
	useEffect(() => {
		// Only apply filters if user has actively set any filter
		const hasActiveFilters =
			filters.searchQuery ||
			filters.location ||
			filters.jobType ||
			filters.salaryRange[0] !== 10 ||
			filters.salaryRange[1] !== 200;

		if (hasActiveFilters) {
			filterJobs(jobs, filters);
		} else {
			// Show all jobs when no filters are applied
			setFilteredJobs(jobs);
		}
	}, [filters, jobs]);

	const value = {
		filteredJobs,
		jobs,
		loading,
		error,
		filters,
		updateFilters,
		resetFilters,
		refreshJobs,
	};

	return (
		<JobFilterContext.Provider value={value}>
			{children}
		</JobFilterContext.Provider>
	);
};
