import { Banner } from "../../components/Banner/banner";
import { Hero } from "../../components/Hero/hero";
import s from './index.module.css';
import banner_sale from './img/banner.jpg'
import banner_product from './img/banner_2.jpg'
import banner_productSize from './img/banner_3.png'
export const HomePage = () => {
	const goods = [
		{
			id: 1,
			image: './cards/img1.png',
			old_price: '1200 ₽',
			price: '840 ₽',
			quantity: '1 шт',
			text: 'Рога оленя для собак весом от 10 до 30 кг. Размер L',
		},
		{
			id: 2,
			image: './cards/img2.png',
			price: '450 ₽',
			quantity: '200 мл',
			text: 'Сельдевое масло',
		},
		{
			id: 3,
			image: './cards/img3.png',
			old_price: '550 ₽',
			price: '495 ₽',
			quantity: '100 г',
			text: 'Бублик из бычьего корня',
		},
		{
			id: 4,
			image: './cards/img4.png',
			price: '240 ₽',
			quantity: '1 шт',
			text: 'Лопаточный хрящ говяжий для собак',
		},

	];
	return (
		<>

			<Hero />
			<div className={s.banner__group}>
				<Banner extraClass="banner_big"
					title="Подарок за первый заказ!"
					subtitle="Легкое говяжье - пластины"
					bg={banner_sale}
					colorBg="#FF8F27"
				/>
				{/* <div className={s.banner__group_middle}> */}
				<Banner extraClass="banner_middle"
					title="Наборы"
					subtitle="для дрессировки"
					bg={banner_product}
					price="от 840 руб."
					colorBg="#D8A217"
				/>
				<Banner extraClass="banner_middle"
					title="Рога северного оленя"
					subtitle="от 10 до 30 кг"
					bg={banner_productSize}
					colorBg="#9CCD55"
				/>
				</div>
			{/* </div> */}
		</>
	)
}