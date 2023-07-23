import { Box, Stack, Text } from "@chakra-ui/react";
import ThemeButtons from "../buttons/ThemeBtn";
import OptionsContainer from "./OptionsContainer";
import ActionButtons from "../buttons/ActionBtn";

function SettingsPanel() {
	return (
		<Box as='div' maxWidth='90dvw' overflowY='scroll' maxHeight='90dvh'>
			<Box>
				<Text fontWeight='bold' fontSize='2em'>
					Settings Panel
				</Text>
			</Box>
			<Stack spacing={4} marginTop='1em'>
				<Text fontWeight='medium' fontSize='1.2em'>
					CV Colors
				</Text>
				<ThemeButtons />
				<OptionsContainer />
				<ActionButtons />
			</Stack>
		</Box>
	);
}

export default SettingsPanel;