import { Box } from "@chakra-ui/react";
import SideCv from "./SideCv";
import MainCv from "./MainCv";
import { useState } from "react";

function TemplatePanel(data) {
	const [cvData, setCvData] = useState(data.data);
	console.log("cvData at template", cvData);

	return (
		<Box as='div' overflowX='hidden' overflowY='auto' display='flex' pos='relative'>
			{/* CV container below  */}
			<Box
				transform={{ base: "scale(0.8)", md: "scale(0.9)" }}
				transformOrigin='top'
				marginTop='1.5em'
				id='cvContainer'
				boxShadow='lg'
				as='div'
				display='grid'
				gridTemplateColumns='1fr 2fr'
				gap='1em'
				width='21cm'
				maxWidth='21cm'
				minHeight='24cm'
				height='auto'
				fontSize='0.875em'>
				<div style={{ background: "#F8FBFD" }}>
					<SideCv data={cvData} />
				</div>
				<div style={{ color: "black" }}>
					<MainCv data={cvData} />
				</div>
			</Box>
			{/* CV container ^ */}
		</Box>
	);
}

export default TemplatePanel;
