import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode"
import { Toaster } from "./components/ui/toaster";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

function App() {	
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Navbar />
			<Toaster/>
			<Routes>        
				<Route path="/" element={<HomePage />} />
				<Route path="/create" element={<CreatePage />} />
			</Routes>
		</Box>
	)
}

export default App;