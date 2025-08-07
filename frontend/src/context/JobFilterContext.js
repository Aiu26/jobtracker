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
		salaryRange: [0, 20], // Default range in LPA (0L to 20L)
	});

	// Filter jobs based on current filters
	const filterJobs = (jobs, filters) => {
		let filtered = [...jobs];
		console.log("🔍 Filtering jobs:", filtered.length, "jobs with filters:", filters);

		// Filter by search query (job title, company name)
		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			filtered = filtered.filter(
				(job) =>
					job.jobTitle?.toLowerCase().includes(query) ||
					job.companyName?.toLowerCase().includes(query)
			);
			console.log("🔍 After search filter:", filtered.length, "jobs");
		}

		// Filter by location
		if (filters.location) {
			filtered = filtered.filter(
				(job) => {
					const jobLocation = job.location?.toLowerCase();
					const filterLocation = filters.location.toLowerCase();
					return jobLocation === filterLocation;
				}
			);
			console.log("🔍 After location filter:", filtered.length, "jobs");
		}

		// Filter by job type
		if (filters.jobType) {
			filtered = filtered.filter(
				(job) => {
					const jobType = job.jobType?.toLowerCase();
					const filterJobType = filters.jobType.toLowerCase();
					return jobType === filterJobType;
				}
			);
			console.log("🔍 After job type filter:", filtered.length, "jobs");
		}

		// Filter by salary range
		// Backend stores salary in rupees (e.g., 1200000 for 12LPA)
		// Frontend filter uses LPA values (e.g., 12 for 12LPA)
		filtered = filtered.filter((job) => {
			if (!job.minSalary || !job.maxSalary) return true;
			
			// Convert salary from rupees to LPA (divide by 100000)
			const minSalaryLPA = job.minSalary / 100000;
			const maxSalaryLPA = job.maxSalary / 100000;
			const avgSalaryLPA = (minSalaryLPA + maxSalaryLPA) / 2;
			
			return (
				avgSalaryLPA >= filters.salaryRange[0] &&
				avgSalaryLPA <= filters.salaryRange[1]
			);
		});
		console.log("🔍 After salary filter:", filtered.length, "jobs");

		console.log("🔍 Final filtered jobs:", filtered);
		setFilteredJobs(filtered);
	};

	// Update filters
	const updateFilters = (newFilters) => {
		console.log("🔄 Updating filters:", newFilters);
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	// Reset all filters
	const resetFilters = () => {
		console.log("🔄 Resetting filters");
		setFilters({
			searchQuery: "",
			location: "",
			jobType: "",
			salaryRange: [0, 20],
		});
	};

	// Apply filters whenever filters change
	useEffect(() => {
		console.log("🔄 Jobs changed, applying filters. Total jobs:", jobs.length);
		console.log("🔄 Current filters:", filters);
		
		// Only apply filters if user has actively set any filter
		const hasActiveFilters =
			filters.searchQuery ||
			filters.location ||
			filters.jobType ||
			filters.salaryRange[0] !== 0 ||
			filters.salaryRange[1] !== 20;

		if (hasActiveFilters) {
			filterJobs(jobs, filters);
		} else {
			// Show all jobs when no filters are applied
			console.log("🔄 No active filters, showing all jobs");
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
