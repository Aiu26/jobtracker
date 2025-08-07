"use client";

import React from "react";
import {
	Group,
	Container,
	TextInput,
	Select,
	RangeSlider,
	Text,
	Divider,
	Button,
	Badge,
} from "@mantine/core";
import {
	IconSearch,
	IconMapPin,
	IconUsers,
	IconCurrencyRupee,
	IconChevronDown,
	IconX,
} from "@tabler/icons-react";
import { useJobFilter } from "../context/JobFilterContext";

const JobSearchFilters = () => {
	const { filters, updateFilters, resetFilters, filteredJobs } =
		useJobFilter();

	const formatSalary = (value) => {
		return `₹${value}k`;
	};

	const handleSearchChange = (value) => {
		updateFilters({ searchQuery: value });
	};

	const handleLocationChange = (value) => {
		updateFilters({ location: value });
	};

	const handleJobTypeChange = (value) => {
		console.log("Job type changed to:", value); // Debug log
		updateFilters({ jobType: value });
	};

	const handleSalaryRangeChange = (value) => {
		updateFilters({ salaryRange: value });
	};

	const hasActiveFilters =
		filters.searchQuery ||
		filters.location ||
		filters.jobType ||
		filters.salaryRange[0] !== 10 ||
		filters.salaryRange[1] !== 200;

	return (
		<Container
			size="xl"
			style={{
				padding: "0.5rem 0",
				marginBottom: "1rem",
			}}
		>
			{/* Debug Section - Remove this in production */}

			<Group
				align="center"
				gap="xs"
				style={{
					backgroundColor: "white",
					borderRadius: "12px",
					padding: "1rem",
					border: "1px solid #e0e0e0",
					boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
				}}
			>
				{/* Search Input */}
				<Group gap="xs" style={{ flex: 1 }}>
					<IconSearch size={20} color="#6c757d" />
					<TextInput
						placeholder="Search By Job Title, Company"
						variant="unstyled"
						style={{ flex: 1 }}
						value={filters.searchQuery}
						onChange={(event) =>
							handleSearchChange(event.currentTarget.value)
						}
						styles={{
							input: {
								border: "none",
								fontSize: "14px",
								"&::placeholder": {
									color: "#6c757d",
								},
							},
						}}
					/>
				</Group>

				{/* Divider */}
				<Divider orientation="vertical" color="#e0e0e0" />

				{/* Location Filter */}
				<Group gap="xs" style={{ flex: 1 }}>
					<IconMapPin size={20} color="#6c757d" />
					<Select
						placeholder="Preferred Location"
						data={[
							{ value: "remote", label: "Remote" },
							{ value: "hybrid", label: "Hybrid" },
							{ value: "onsite", label: "On-site" },
							{ value: "mumbai", label: "Mumbai" },
							{ value: "delhi", label: "Delhi" },
							{ value: "bangalore", label: "Bangalore" },
						]}
						value={filters.location}
						onChange={handleLocationChange}
						variant="unstyled"
						rightSection={
							<IconChevronDown size={16} color="#6c757d" />
						}
						styles={{
							input: {
								border: "none",
								fontSize: "14px",
								"&::placeholder": {
									color: "#6c757d",
								},
							},
							rightSection: {
								pointerEvents: "none",
							},
						}}
					/>
				</Group>

				{/* Divider */}
				<Divider orientation="vertical" color="#e0e0e0" />

				{/* Job Type Filter */}
				<Group gap="xs" style={{ flex: 1 }}>
					<IconUsers size={20} color="#6c757d" />
					<Select
						placeholder="Job type"
						data={[
							{ value: "full-time", label: "Full Time" },
							{ value: "part-time", label: "Part Time" },
							{ value: "contract", label: "Contract" },
							{ value: "internship", label: "Internship" },
							{ value: "freelance", label: "Freelance" },
						]}
						value={filters.jobType}
						onChange={handleJobTypeChange}
						variant="unstyled"
						rightSection={
							<IconChevronDown size={16} color="#6c757d" />
						}
						styles={{
							input: {
								border: "none",
								fontSize: "14px",
								"&::placeholder": {
									color: "#6c757d",
								},
							},
							rightSection: {
								pointerEvents: "none",
							},
						}}
					/>
				</Group>

				{/* Divider */}
				<Divider orientation="vertical" color="#e0e0e0" />

				{/* Salary Range Filter */}
				<Group gap="xs" style={{ flex: 1, minWidth: "200px" }}>
					<div style={{ width: "100%" }}>
						<Text
							size="xs"
							c="dimmed"
							style={{ marginBottom: "4px" }}
						>
							Salary Per Month
						</Text>
						<Text
							size="sm"
							fw={500}
							style={{ marginBottom: "8px" }}
						>
							{formatSalary(filters.salaryRange[0])} -{" "}
							{formatSalary(filters.salaryRange[1])}
						</Text>
						<RangeSlider
							value={filters.salaryRange}
							onChange={handleSalaryRangeChange}
							min={10}
							max={200}
							step={10}
							minRange={10}
							size="sm"
							color="violet"
							styles={{
								track: {
									backgroundColor: "#e0e0e0",
								},
								bar: {
									backgroundColor: "#6c5ce7",
								},
								thumb: {
									border: "2px solid #6c5ce7",
									backgroundColor: "white",
								},
							}}
						/>
					</div>
				</Group>

				{/* Clear Filters Button */}
				{hasActiveFilters && (
					<>
						<Divider orientation="vertical" color="#e0e0e0" />
						<Button
							variant="subtle"
							size="sm"
							onClick={resetFilters}
							leftSection={<IconX size={16} />}
							styles={{
								root: {
									color: "#6c757d",
									"&:hover": {
										backgroundColor: "#f8f9fa",
									},
								},
							}}
						>
							Clear
						</Button>
					</>
				)}
			</Group>
		</Container>
	);
};

export default JobSearchFilters;
