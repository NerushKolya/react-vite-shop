import { ChangeEvent, useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
// import { PREFIX } from '../../helpers/API';
// import axios, { AxiosError } from 'axios';
import type { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import { mockProducts } from '../../dump/mockProducts';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// const [error, setError] = useState<string | undefined>();
	const [error] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		console.log(name);
		setIsLoading(true);
		setProducts(mockProducts);
		// setError('ERROR: Не удалось загрузить продукты');
		setIsLoading(false);
	};

	// const getMenu2 = async (name?: string) => {
	// 	try {
	// 		setIsLoading(true);
	// 		const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
	// 			params: {
	// 				name
	// 			}
	// 		});
	// 		setProducts(data);
	// 		setIsLoading(false);
	// 	} catch (e) {
	// 		console.error(e);
	// 		if (e instanceof AxiosError) {
	// 			setError(e.message);
	// 		}
	// 		setIsLoading(false);
	// 		return;
	// 	}
	// };
	
	// const getMenu1 = async () => {
	// 	try {
	// 		const res = await fetch(`${PREFIX}/products`);
	// 		if (!res.ok) {
	// 			return;
	// 		}
	// 		const data = await res.json() as Product[];
	//		//const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
	// 		setProducts(data);
	// 	} catch (e) {
	// 		console.error(e);
	// 		return;
	// 	}
	// };

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};
	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав' onChange={updateFilter} />
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && products.length > 0 && <MenuList products={products} />}
			{isLoading && <>Загружаем продукты...</>}
			{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
		</div>
	</>;
}
export default Menu;

