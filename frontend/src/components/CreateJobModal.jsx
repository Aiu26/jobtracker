"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Modal,
	TextInput,
	Select,
	NumberInput,
	Textarea,
	Button,
	Group,
	Stack,
	Text,
	Grid,
	GridCol,
} from "@mantine/core";
import {
	IconChevronDown,
	IconCalendar,
	IconArrowDown,
	IconArrowRight,
} from "@tabler/icons-react";
import { useJobs } from "../context/JobsContext";

const CreateJobModal = ({ opened, onClose }) => {
	const [loading, setLoading] = useState(false);
	const { refreshJobs } = useJobs();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm({
		defaultValues: {
			jobTitle: "",
			location: "",
			minSalary: 0,
			maxSalary: 1200000,
			companyName: "",
			jobType: "",
			applicationDeadline: "",
			jobDescription: "",
		},
	});

	const onSubmit = async (data) => {
		// Manual validation
		if (
			!data.jobTitle ||
			!data.location ||
			!data.jobType ||
			!data.companyName ||
			!data.applicationDeadline ||
			!data.jobDescription ||
			data.minSalary === undefined ||
			data.maxSalary === undefined
		) {
			alert("Please fill in all required fields");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...data,
						isPublished: true,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || "Failed to create job posting"
				);
			}

			const result = await response.json();
			console.log("Job created successfully:", result);
			reset();
			onClose();

			// Refresh the jobs list to show the new job
			refreshJobs();
		} catch (error) {
			console.error("Error submitting form:", error);
			alert(
				error.message ||
					"Failed to create job posting. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleSaveDraft = () => {
		alert("Draft functionality coming soon!");
	};

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={
				<Text size="xl" fw={600} ta="center" style={{ width: "100%" }}>
					Create Job Opening
				</Text>
			}
			size="lg"
			centered
			radius="lg"
			styles={{
				title: {
					width: "100%",
					textAlign: "center",
				},

				header: {
					borderBottom: "1px solid #e0e0e0",
					paddingBottom: "1rem",
				},
				content: {
					padding: "2rem",
				},
			}}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap="lg">
					{/* Two Column Layout */}
					<Grid gutter="md">
						{/* Left Column */}
						<GridCol span={6}>
							<Stack gap="md">
								{/* Job Title */}
								<div>
									<Text size="sm" fw={500} mb={8}>
										Job Title
									</Text>
									<TextInput
										placeholder="Enter job title"
										{...register("jobTitle", {
											required: "Job title is required",
										})}
										error={errors.jobTitle?.message}
										styles={{
											input: {
												borderRadius: "8px",
												border: "1px solid #e0e0e0",
												padding: "12px 16px",
												fontSize: "14px",
												"&:focus": {
													borderColor: "#6c5ce7",
												},
											},
										}}
									/>
								</div>

								{/* Location */}
								<div>
									<Text size="sm" fw={500} mb={8}>
										Location
									</Text>
									<Select
										placeholder="Choose Preferred Location"
										data={[
											{
												value: "remote",
												label: "Remote",
											},
											{
												value: "hybrid",
												label: "Hybrid",
											},
											{
												value: "onsite",
												label: "On-site",
											},
											{
												value: "mumbai",
												label: "Mumbai",
											},
											{ value: "delhi", label: "Delhi" },
											{
												value: "bangalore",
												label: "Bangalore",
											},
										]}
										rightSection={
											<IconChevronDown size={16} />
										}
										value={watch("location")}
										onChange={(value) =>
											setValue("location", value)
										}
										error={errors.location?.message}
										styles={{
											input: {
												borderRadius: "8px",
												border: "1px solid #e0e0e0",
												padding: "12px 16px",
												fontSize: "14px",
												"&:focus": {
													borderColor: "#6c5ce7",
												},
											},
										}}
									/>
								</div>

								{/* Salary Range */}
								<div>
									<Text size="sm" fw={500} mb={8}>
										Salary Range
									</Text>
									<Group
										gap="xs"
										align="center"
										style={{ flexWrap: "nowrap" }}
									>
										<NumberInput
											placeholder="₹0"
											min={0}
											max={10000000}
											value={watch("minSalary")}
											onChange={(value) =>
												setValue("minSalary", value)
											}
											style={{ flex: 1 }}
											error={errors.minSalary?.message}
											styles={{
												input: {
													borderRadius: "8px",
													border: "1px solid #e0e0e0",
													padding: "12px 16px",
													fontSize: "14px",
													"&:focus": {
														borderColor: "#6c5ce7",
													},
												},
												control: {
													border: "none",
													backgroundColor:
														"transparent",
												},
											}}
										/>
										<Text
											size="sm"
											c="dimmed"
											style={{
												margin: "0 12px",
												whiteSpace: "nowrap",
											}}
										>
											to
										</Text>
										<NumberInput
											placeholder="₹12,00,000"
											min={0}
											max={10000000}
											value={watch("maxSalary")}
											onChange={(value) =>
												setValue("maxSalary", value)
											}
											style={{ flex: 1 }}
											error={errors.maxSalary?.message}
											styles={{
												input: {
													borderRadius: "8px",
													border: "1px solid #e0e0e0",
													padding: "12px 16px",
													fontSize: "14px",
													"&:focus": {
														borderColor: "#6c5ce7",
													},
												},
												control: {
													border: "none",
													backgroundColor:
														"transparent",
												},
											}}
										/>
									</Group>
								</div>
							</Stack>
						</GridCol>

						{/* Right Column */}
						<GridCol span={6}>
							<Stack gap="md">
								{/* Company Name */}
								<div>
									<Text size="sm" fw={500} mb={8}>
										Company Name
									</Text>
									<TextInput
										placeholder="Amazon, Microsoft, Swiggy"
										{...register("companyName", {
											required:
												"Company name is required",
										})}
										error={errors.companyName?.message}
										styles={{
											input: {
												borderRadius: "8px",
												border: "1px solid #e0e0e0",
												padding: "12px 16px",
												fontSize: "14px",
												"&:focus": {
													borderColor: "#6c5ce7",
												},
											},
										}}
									/>
								</div>

								{/* Job Type */}
								<div>
									<Text size="sm" fw={500} mb={8}>
										Job Type
									</Text>
									<Select
										placeholder="Select job type"
										data={[
											{
												value: "full-time",
												label: "Full Time",
											},
											{
												value: "part-time",
												label: "Part Time",
											},
											{
												value: "contract",
												label: "Contract",
											},
											{
												value: "internship",
												label: "Internship",
											},
											{
												value: "freelance",
												label: "Freelance",
											},
										]}
										rightSection={
											<IconChevronDown size={16} />
										}
										value={watch("jobType")}
										onChange={(value) =>
											setValue("jobType", value)
										}
										error={errors.jobType?.message}
										styles={{
											input: {
												borderRadius: "8px",
												border: "1px solid #e0e0e0",
												padding: "12px 16px",
												fontSize: "14px",
												"&:focus": {
													borderColor: "#6c5ce7",
												},
											},
										}}
									/>
								</div>

								{/* Application Deadline */}
								<div>
									<Text size="sm" fw={500} mb={8}>
										Application Deadline
									</Text>
									<TextInput
										type="date"
										placeholder="Select application deadline"
										rightSection={
											<IconCalendar
												size={16}
												color="#6c757d"
											/>
										}
										{...register("applicationDeadline", {
											required:
												"Application deadline is required",
										})}
										error={
											errors.applicationDeadline?.message
										}
										styles={{
											input: {
												borderRadius: "8px",
												border: "1px solid #e0e0e0",
												padding: "12px 16px",
												paddingRight: "40px",
												fontSize: "14px",
												height: "42px",
												lineHeight: "1.5",
												"&:focus": {
													borderColor: "#6c5ce7",
												},
											},
											rightSection: {
												pointerEvents: "none",
												color: "#6c757d",
												width: "40px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											},
										}}
									/>
								</div>
							</Stack>
						</GridCol>
					</Grid>

					{/* Job Description - Full Width */}
					<div>
						<Text size="sm" fw={500} mb={8}>
							Job Description
						</Text>
						<Textarea
							placeholder="Please share a description to let the candidate know more about the job role"
							minRows={4}
							maxRows={8}
							{...register("jobDescription", {
								required: "Job description is required",
							})}
							error={errors.jobDescription?.message}
							styles={{
								input: {
									borderRadius: "8px",
									border: "1px solid #e0e0e0",
									padding: "12px 16px",
									fontSize: "14px",
									height: "100px",
									resize: "vertical",
									"&:focus": {
										borderColor: "#6c5ce7",
									},
								},
							}}
						/>
					</div>

					{/* Action Buttons */}
					<Group justify="space-between" mt="xl">
						<Button
							variant="outline"
							color="dark"
							size="md"
							onClick={handleSaveDraft}
							leftSection={<IconArrowDown size={16} />}
							styles={{
								root: {
									border: "1px solid #000",
									color: "#000",
									"&:hover": {
										backgroundColor: "#f8f9fa",
									},
								},
							}}
						>
							Save Draft
						</Button>
						<Button
							type="submit"
							color="blue"
							size="md"
							loading={loading}
							rightSection={<IconArrowRight size={16} />}
							styles={{
								root: {
									backgroundColor: "#1976d2",
									"&:hover": {
										backgroundColor: "#1565c0",
									},
								},
							}}
						>
							Publish
						</Button>
					</Group>
				</Stack>
			</form>
		</Modal>
	);
};

export default CreateJobModal;
