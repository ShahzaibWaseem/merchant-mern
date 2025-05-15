import { Container, SimpleGrid, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	console.log("Products", products);

	return (
	<Container maxW="container.xl" py={12}>
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
				Current Products 🚀
			</Heading>

			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 3 }}
				spacing={10}
				w={"full"}
				gap={10}
			>
				{ products.map((product) => (
					<ProductCard key={product._id} product={product} />
				)) }
			</SimpleGrid>

			{ products.length === 0 && (
				<Text
					fontSize={"xl"}
					textAlign={"center"}
					fontWeight={"bold"}
					color={"gray.500"}
				>
					No products found 😢{" "}
					<Link to={"/create"}>
						<Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}>Create a Product</Text>
					</Link>
				</Text>
			) }

		</VStack>
	</Container>
	);
};

export default HomePage;