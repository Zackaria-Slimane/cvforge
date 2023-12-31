import { Box, Stack, Checkbox, Button } from "@chakra-ui/react";

import { useContext, useState } from "react";
import CvContext from "../../utils/cvContext";
import StandardInput from "../inputs/StandardInput";
import SummaryInput from "../inputs/SummaryInput";
import AddSectionBtn from "../buttons/AddSectionBtn";

function WorkPanel({ ...props }) {
	const { sharedData, updateSharedData } = useContext(CvContext);
	const [localData, setLocalData] = useState({ ...sharedData });
	const [newId, setNewId] = useState(crypto.randomUUID().slice(0, 13));
	const [newData, setNewData] = useState({ id: newId, summary: [] });
	const [isChecked, setIsChecked] = useState(false);
	const [newTask, setNewTask] = useState(" ");

	const handleChange = (event, inputData, id) => {
		let newObj = { ...newData, id: id !== undefined ? id : newId };
		let updatedText;
		let updatedChecked;

		if (inputData === "current") {
			updatedChecked = event.target.checked ? true : false;
			setIsChecked(updatedChecked);
			newObj.to = "Current";
			newObj[inputData] = updatedChecked;
			setNewData(newObj);
			return;
		}
		if (inputData !== "current") {
			updatedText = event.target.value;
			newObj[inputData] = updatedText;
			setNewData(newObj);
			return;
		}
	};

	const updateArray = (event) => {
		const updatedInput = event.target.value;
		setNewTask(updatedInput);
	};

	function removeDuplicateObjectsLast(arr, idProperty) {
		const seenIds = {}; // Object to track encountered IDs
		const reversedArr = arr.slice().reverse(); // Create a reversed copy of the array
		return reversedArr
			.filter((obj) => {
				if (!seenIds[obj[idProperty]]) {
					seenIds[obj[idProperty]] = true;
					return true;
				}
				return false;
			})
			.reverse();
	}

	const handleAddTask = (task) => {
		let newTask = {
			id: crypto.randomUUID().slice(0, 8),
			task: task,
		};

		let newWork = { ...newData };
		let updatedWork = { ...newWork, summary: [...newWork.summary, newTask] };
		setNewData(updatedWork);
		handleUpdateLocal(updatedWork);
		setNewTask(" ");
		// add a toast notification here as ui feedback
	};

	const handleUpdateLocal = (data) => {
		let cleanData = { ...data, summary: removeDuplicateObjectsLast(data.summary, "id") };
		let local = { ...localData, work: [...localData.work, cleanData] };
		const cleanLocal = { ...local, work: removeDuplicateObjectsLast(local.work, "id") };
		setLocalData(cleanLocal);
	};

	const handleUpdateShared = () => {
		updateSharedData(localData);
		setNewId(crypto.randomUUID().slice(0, 13));
		setNewData({ id: newId, summary: [] });
	};

	return (
		<Box
			as='div'
			display='flex'
			flexDirection='column'
			alignContent='center'
			justifyContent='normal'
			alignItems='stretch'
			marginTop='1em'>
			<Stack spacing={6}>
				<StandardInput
					label='Title'
					name='title'
					type='text'
					placeholder='Title'
					onChange={() => handleChange(event, "title", newId)}
				/>
				<StandardInput
					hidden={props.link === undefined ? false : true}
					label='Location'
					name='location'
					type='text'
					placeholder='City  , Country'
					onChange={() => handleChange(event, "location", newId)}
				/>
				<StandardInput
					hidden={props.link === undefined ? true : false}
					label='URL'
					name='url'
					type='link'
					placeholder='https://www.example.com'
					onChange={() => handleChange(event, "url", newId)}
				/>
				<StandardInput
					hidden={props.link === undefined ? true : false}
					label='Date'
					name='date'
					type='date'
					onChange={() => handleChange(event, "date", newId)}
				/>
				<StandardInput
					hidden={props.link === undefined ? false : true}
					label='Date from'
					name='dateFrom'
					type='date'
					onChange={() => handleChange(event, "from", newId)}
				/>
				<div style={{ display: isChecked ? "none" : "block" }}>
					<StandardInput
						hidden={props.link === undefined ? false : true}
						label='Date to'
						name='dateTo'
						type='date'
						onChange={() => handleChange(event, "to", newId)}
					/>
				</div>
				<Checkbox
					hidden={props.link === undefined ? false : true}
					name='current'
					isChecked={isChecked}
					value={isChecked}
					muid={newId}
					onChange={() => handleChange(event, "current", newId)}>
					Current
				</Checkbox>
				<SummaryInput
					label='Summary'
					name='summary'
					placeholder='Tasks you worked on'
					mid={newId}
					value={newTask}
					onChange={() => updateArray(event)}
				/>
				<Button
					colorScheme='twitter'
					variant='outline'
					h='1.8rem'
					size='md'
					onClick={() => handleAddTask(newTask)}>
					Add task
				</Button>
			</Stack>
			<AddSectionBtn
				marginTop='1em'
				variant='outline'
				label='Save'
				onClick={() => handleUpdateShared()}
			/>
		</Box>
	);
}

export default WorkPanel;
