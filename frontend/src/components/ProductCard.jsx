import {
    Text,
    Box,
    Heading,
    HStack,
	VStack,
	Input,
    IconButton,
    Image,
    Dialog,
    Portal,
    Button,
	CloseButton,
} from "@chakra-ui/react";

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore, showToast } from "../store/product";

const ProductCard = ({ product }) => {
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const [ updatedProduct, setUpdatedProduct ] = useState(product);

	const { deleteProduct, updateProduct } = useProductStore();
	const [ open, setOpen ] = useState(false);

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		showToast(success, message);
	}

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		showToast(success, "Product updated successfully");
		if (success) setOpen(false);
	}

	const dialog = (
		<Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
			<Dialog.Trigger asChild>
				<CiEdit />
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop backdropFilter={"blur(10px)"} />
				<Dialog.Positioner>
					<Dialog.Content bg={bg}>
						<Dialog.Header>
							<Dialog.Title>Update Product</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<VStack spacing={4}>
								<Input
									borderColor={textColor}
									placeholder='Product Name'
									name='name'
									value={updatedProduct.name}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
								/>
								<Input
									borderColor={textColor}
									placeholder='Price'
									name='price'
									type='number'
									value={updatedProduct.price}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
								/>
								<Input
									borderColor={textColor}
									placeholder='Image URL'
									name='image'
									value={updatedProduct.image}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
								/>
							</VStack>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="ghost">Cancel</Button>
							</Dialog.ActionTrigger>
							<Button
								rounded={"l3"}
								bgGradient={"to-r"}
								gradientFrom={"cyan.400"}
								gradientTo={"blue.500"}
								bgClip={"padding-box"}
								onClick={() => handleUpdateProduct(product._id, updatedProduct)}
							>
								Update
							</Button>
						</Dialog.Footer>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="lg" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);

	return (
		<Box
			shadow={"lg"}
			rounded={"lg"}
			overflow={"hidden"}
			transition={"all 0.3s"}
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
			onClick={() => setOpen(true)}
		>
			<Image src={product.image} alt={product.name} width={"full"} height={48} objectFit={"cover"} />

			<Box p={4}>
				<Heading as={"h3"} size={"md"} mb={2} fontWeight={"bold"} color={textColor}>
					{product.name}
				</Heading>

				<Text fontWeight={"bold"} color={textColor} fontSize={"xl"} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton
						rounded={"l3"}
						bgGradient={"to-r"}
						gradientFrom={"cyan.400"}
						gradientTo={"blue.500"}
						bgClip={"padding-box"}
					>
						{dialog}
					</IconButton>
					<IconButton
						rounded={"l3"}
						onClick={ () => handleDeleteProduct(product._id) }
						bgGradient={"to-l"}
						gradientFrom={"orange.400"}
						gradientTo={"red.500"}
						bgClip={"padding-box"}
					>
						<MdOutlineDelete />
					</IconButton>
				</HStack>
			</Box>
		</Box>
	);
}

export default ProductCard;