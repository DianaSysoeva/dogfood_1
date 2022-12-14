import { useContext } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../../components/NotFound/not-found";
import Product from "../../components/Product/product";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { useApi } from "../../hooks/useApi.js";
import api from "../../utils/api";
import { isLiked } from "../../utils/product";


export const ProductPage = () => {
	const { productId } = useParams();
	const { handleLike } = useContext(CardContext);

	// const [errorState, setErrorState] = useState(null);
	// const [product, setProduct] = useState(null);

	const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]);

	const {
		data: product,
		setData: setProduct,
		loading: isLoading,
		error: errorState

	} = useApi(handleGetProduct);


	const handleProductLike = useCallback(() => {
		handleLike(product).then((updateProduct) => {
			setProduct(updateProduct);
		});

	}, [product], handleLike, setProduct)



	return (
		<div className="container container_inside">
			<div className='contents__card'>
				{isLoading
					? <Spinner />
					: !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleProductLike} />
				}
				{!isLoading && errorState && <NotFound />}
			</div>
		</div>
	);
}




