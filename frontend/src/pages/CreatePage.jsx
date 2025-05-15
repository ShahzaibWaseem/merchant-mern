import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore, showToast } from "../store/product";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

	const boxBgColor = useColorModeValue("white", "gray.800");

	const {createProduct} = useProductStore();

	const handleAddProduct = async() => {
		const {success, message} = await createProduct(newProduct);

		showToast(success, message);

		console.log("Success:", success);
		console.log("Message:", message);
		setNewProduct({
			name: "",
			price: "",
			image: "",
		});
	}

	return (
		<Container maxW={"container.sm"} py={12}>
			<VStack spacing={8}>
				<Heading
					as={"h1"}
					size={"2xl"}
					fontWeight={"bold"}
					bgGradient={"to-r"}
					gradientFrom={"cyan.400"}
					gradientTo={"blue.500"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Create New Product
				</Heading>

				<Box w={"full"} bg={boxBgColor} p={12} rounded={"lg"} lg={"md"}>

					<VStack spacing={4}>
						<Input
							placeholder="Product Name"
							name="name"
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>

						<Input
							placeholder="Price"
							name="price"
							type="number"
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>

						<Input
							placeholder="Image URL"
							name="image"
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>

						<Button
							// colorPalette="blue"
							rounded={"l3"}
							bgGradient={"to-r"}
							gradientFrom={"cyan.400"}
							gradientTo={"blue.500"}
							bgClip={"padding-box"}
							onClick={handleAddProduct}
							w="full"
						>
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};

export default CreatePage;