"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { jobsData } from "../data/jobsData";

const JobsContext = createContext();

export const useJobs = () => {
	const context = useContext(JobsContext);
	if (!context) {
		throw new Error("useJobs must be used within a JobsProvider");
	}
	return context;
};

export const JobsProvider = ({ children }) => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch jobs from backend API
	const fetchJobs = async () => {
		try {
			setLoading(true);
			console.log("🔍 Fetching jobs from API...");
			console.log(
				`🌐 Making request to: ${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`
			);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`
			);
			console.log("📡 Response status:", response.status);
			console.log("📡 Response headers:", response.headers);

			if (!response.ok) {
				const errorText = await response.text();
				console.error("❌ Response not ok:", errorText);
				throw new Error(
					`Failed to fetch jobs: ${response.status} - ${errorText}`
				);
			}

			const backendJobs = await response.json();
			console.log("✅ Fetched jobs successfully:", backendJobs);
			console.log("📊 Number of backend jobs:", backendJobs.length);
			console.log("📋 Backend jobs data:", JSON.stringify(backendJobs, null, 2));

			// Combine dummy data with backend data
			// Use dummy data as initial jobs, then add backend jobs
			const combinedJobs = [...jobsData, ...backendJobs];
			console.log("📊 Total jobs (dummy + backend):", combinedJobs.length);
			
			setJobs(combinedJobs);
		} catch (err) {
			console.error("❌ Error fetching jobs:", err);
			console.error("❌ Error details:", err.message);
			// If backend fails, still show dummy data
			console.log("🔄 Falling back to dummy data only");
			setJobs(jobsData);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Refresh jobs (for when new job is added)
	const refreshJobs = () => {
		fetchJobs();
	};

	// Initialize with dummy data and fetch backend data
	useEffect(() => {
		// Start with dummy data immediately
		setJobs(jobsData);
		setLoading(false);
		
		// Then fetch backend data
		fetchJobs();
	}, []);

	const value = {
		jobs,
		loading,
		error,
		refreshJobs,
	};

	return (
		<JobsContext.Provider value={value}>{children}</JobsContext.Provider>
	);
};
