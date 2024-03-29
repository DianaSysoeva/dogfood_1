import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/constants"
import Form from "../Form/form"
import { FormInput } from "../FormInput/form-input"
import { FormButton } from "../FormButton/form-button"
import { useState } from "react"
import { Rating } from "../Rating/rating"
import api from "../../utils/api"

export const FormReview = ({ title = "Отзыв о товаре", productId, setProduct }) => {

	const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })
	const [rating, setRating] = useState(5)

	const sendReviewProduct = (data) => {
		api.createReviewProduct(productId, { ...data, rating })
			.then(newProduct => {
				setProduct && setProduct(newProduct)
			})

	}

	const textReview = register('text', {
		required: {
			value: true,
			message: VALIDATE_CONFIG.requiredMessage
		},

	})


	return (
		<Form title={title} handleFormSubmit={handleSubmit(sendReviewProduct)} >
			<Rating rating={rating} isEditable setRating={setRating} />
			<FormInput
				{...textReview}
				id="text"
				typeinput="textarea"
				placeholder="Напишите текст отзыва"
			/>

			{errors?.email && <p className='errorMessage'> {errors?.email?.message}</p>}

			<FormButton color='yellow' type="submit">Отправить отзыв</FormButton>

		</Form>
	)
}