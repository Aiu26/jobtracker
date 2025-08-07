"use client";

import React from "react";
import {
	Group,
	Container,
	Card,
	Text,
	Badge,
	Button,
	Avatar,
	Stack,
	Alert,
} from "@mantine/core";
import {
	IconUser,
	IconBuilding,
	IconCurrencyRupee,
	IconMapPin,
	IconAlertCircle,
	IconBriefcase,
} from "@tabler/icons-react";
import { useJobFilter } from "../context/JobFilterContext";

const JobCards = () => {
	const { filteredJobs, loading, error } = useJobFilter();

	if (loading) {
		return (
			<Container
				size="xl"
				style={{ padding: "1rem 0", marginBottom: "2rem" }}
			>
				<Text size="lg" ta="center" c="dimmed">
					Loading jobs...
				</Text>
			</Container>
		);
	}

	if (error) {
		return (
			<Container
				size="xl"
				style={{ padding: "1rem 0", marginBottom: "2rem" }}
			>
				<Alert
					icon={<IconAlertCircle size={16} />}
					title="Error loading jobs"
					color="red"
					variant="light"
					style={{
						textAlign: "center",
						padding: "2rem",
					}}
				>
					{error}
				</Alert>
			</Container>
		);
	}

	// Function to render company logo
	const renderCompanyLogo = (job) => {
		const companyName = job.companyName?.toLowerCase();
		
		// Handle dummy data with logo paths
		if (job.logo && job.logo.startsWith('/')) {
			return (
				<img
					src={job.logo}
					alt={job.companyName}
					style={{
						width: "48px",
						height: "48px",
						borderRadius: "50%",
						objectFit: "contain",
					}}
				/>
			);
		}
		
		// Handle backend data with specific company logos
		if (companyName === "swiggy") {
			return (
				<img
					src="/swiggy.png"
					alt="Swiggy"
					style={{
						width: "48px",
						height: "48px",
						borderRadius: "50%",
						objectFit: "contain",
					}}
				/>
			);
		} else if (companyName === "tesla") {
			return (
				<img
					src="/tesla.png"
					alt="Tesla"
					style={{
						width: "48px",
						height: "48px",
						borderRadius: "50%",
						objectFit: "contain",
					}}
				/>
			);
		} else if (companyName === "amazon") {
			return (
				<img
					src="/amazon.png"
					alt="Amazon"
					style={{
						width: "48px",
						height: "48px",
						borderRadius: "50%",
						objectFit: "contain",
					}}
				/>
			);
		} else {
			// Fallback to avatar with company initial
			return (
				<Avatar
					size="lg"
					radius="xl"
					style={{
						backgroundColor: "#f8f9fa",
						color: "#495057",
						fontWeight: "bold",
						fontSize: "18px",
					}}
				>
					{job.companyName?.charAt(0) || "J"}
				</Avatar>
			);
		}
	};

	return (
		<Container
			size="xl"
			style={{
				padding: "1rem 0",
				marginBottom: "2rem",
			}}
		>
			{/* Results Counter */}
			<Text
				size="sm"
				c="dimmed"
				style={{
					marginBottom: "1rem",
					textAlign: "center",
				}}
			>
				{filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}{" "}
				found
			</Text>

			{filteredJobs.length === 0 ? (
				<Alert
					icon={<IconAlertCircle size={16} />}
					title="No jobs found"
					color="blue"
					variant="light"
					style={{
						textAlign: "center",
						padding: "2rem",
					}}
				>
					No jobs match your current filters. Try adjusting your
					search criteria.
				</Alert>
			) : (
				<Group gap="sm" style={{ justifyContent: "center" }}>
					{filteredJobs &&
						filteredJobs.map((job) => (
							<Card
								key={job.id}
								shadow="sm"
								padding="lg"
								radius="md"
								withBorder
								style={{
									minWidth: "180px",
									maxWidth: "300px",
									backgroundColor: "white",
								}}
							>
								{/* Header with Logo and Time Posted */}
								<Group
									justify="space-between"
									align="flex-start"
									style={{ marginBottom: "1rem" }}
								>
									{renderCompanyLogo(job)}
									<Badge
										color="blue"
										variant="light"
										size="sm"
										style={{
											backgroundColor: "#e3f2fd",
											color: "#1976d2",
											fontSize: "12px",
										}}
									>
										{job.isPublished ? "24h" : "Draft"}
									</Badge>
								</Group>

								{/* Job Title */}
								<Text
									size="lg"
									fw={700}
									style={{
										color: "#212529",
										marginBottom: "0.5rem",
										lineHeight: 1.2,
									}}
								>
									{job.jobTitle}
								</Text>

								{/* Company Name */}
								<Text
									size="md"
									fw={500}
									c="dimmed"
									style={{
										marginBottom: "1rem",
									}}
								>
									{job.companyName}
								</Text>

								{/* Job Details */}
								<Group
									gap="xs"
									style={{ marginBottom: "1rem" }}
								>
									<Group gap="xs">
										<IconUser size={16} color="#6c757d" />
										<Text size="sm" c="dimmed">
											{job.experience || "1-3 yr Exp"}
										</Text>
									</Group>
									<Group gap="xs">
										<IconMapPin size={16} color="#6c757d" />
										<Text size="sm" c="dimmed">
											{job.location}
										</Text>
									</Group>
									<Group gap="xs">
										<IconBriefcase
											size={16}
											color="#6c757d"
										/>
										<Text size="sm" c="dimmed">
											{job.jobType}
										</Text>
									</Group>
									<Group gap="xs">
										<IconCurrencyRupee
											size={16}
											color="#6c757d"
										/>
										<Text size="sm" c="dimmed">
											₹
											{(job.minSalary / 100000).toFixed(
												1
											)}
											L - ₹
											{(job.maxSalary / 100000).toFixed(
												1
											)}
											L
										</Text>
									</Group>
								</Group>

								{/* Description */}
								<Stack
									gap="xs"
									style={{ marginBottom: "1rem" }}
								>
									<Text
										size="sm"
										c="dimmed"
										style={{
											lineHeight: 1.4,
											display: "-webkit-box",
											WebkitLineClamp: 3,
											WebkitBoxOrient: "vertical",
											overflow: "hidden",
										}}
									>
										{job.jobDescription}
									</Text>
								</Stack>

								{/* Apply Button */}
								<Button
									fullWidth
									variant="filled"
									color="blue"
									size="md"
									radius="md"
									style={{
										backgroundColor: "#1976d2",
										fontWeight: 500,
										transition: "all 0.2s ease",
										"&:hover": {
											backgroundColor: "#1565c0",
											transform: "translateY(-1px)",
										},
									}}
								>
									Apply Now
								</Button>
							</Card>
						))}
				</Group>
			)}
		</Container>
	);
};

export default JobCards;
