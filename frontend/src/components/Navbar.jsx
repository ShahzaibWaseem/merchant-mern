import { Button, Container, Flex, HStack, Heading } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode"
import { Link } from "react-router-dom";

import { LuSquarePlus, LuMoon, LuSun } from "react-icons/lu";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row"
				}}
			>
				<Heading 
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"to-r"}
					gradientFrom={"cyan.400"}
					gradientTo={"blue.500"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Heading>

				<HStack spacing={2} alignItems={"center"}>

					<Link to={"/create"}>
						<Button variant={"surface"} rounded={"l3"}>
							<LuSquarePlus fontSize={20} />
						</Button>
					</Link>

					<Button variant={"surface"} rounded={"l3"} onClick={toggleColorMode}>
						{colorMode === "light" ? <LuMoon /> : <LuSun />}
					</Button>

				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;