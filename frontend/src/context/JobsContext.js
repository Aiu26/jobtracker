"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
				`🌐 Making request to: ${process.env.BACKEND_URL}/jobs`
			);

			const response = await fetch(`${process.env.BACKEND_URL}/jobs`);
			console.log("📡 Response status:", response.status);
			console.log("📡 Response headers:", response.headers);

			if (!response.ok) {
				const errorText = await response.text();
				console.error("❌ Response not ok:", errorText);
				throw new Error(
					`Failed to fetch jobs: ${response.status} - ${errorText}`
				);
			}

			const data = await response.json();
			console.log("✅ Fetched jobs successfully:", data);
			console.log("📊 Number of jobs:", data.length);
			console.log("📋 Jobs data:", JSON.stringify(data, null, 2));

			setJobs(data);
		} catch (err) {
			console.error("❌ Error fetching jobs:", err);
			console.error("❌ Error details:", err.message);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Refresh jobs (for when new job is added)
	const refreshJobs = () => {
		fetchJobs();
	};

	// Fetch jobs on component mount
	useEffect(() => {
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
