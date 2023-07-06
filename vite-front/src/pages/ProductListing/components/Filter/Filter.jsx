import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import { RxCross2 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import React from 'react';
import './Filter.css';

export const Filter = (props) => {
	const [isFilterMenuOn, setIsFilterMenuOn] = useState(false);
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [categories, setCategories] = useState([]);

	const [categoryFilter, setCategorFilter] = useState({});

	const [priceFilter, setPriceFilter] = useState({
		below200: false,
		between201and999: false,
		between1000and1999: false,
		above2000: false,
	});

	const [sortingFilter, setSortingFilter] = useState({
		highToLow: false,
		lowToHigh: false,
	});

	useEffect(() => {
		fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/categories', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setCategories(data.data);

				setCategorFilter(
					data.data.reduce((acc, category) => {
						acc[category.name] = false;
						return acc;
					}, {})
				);
			});
	}, []);

	const applyFilters = () => {
		setIsFilterApplied(true);
		props.sendData(priceFilter, sortingFilter, categoryFilter);
	};

	return (
		<div>
			<div
				className={
					isFilterMenuOn
						? 'filter-container filter-container-mobile-open'
						: 'filter-container filter-container-mobile-closed'
				}
			>
				<div
					className={
						!isFilterMenuOn
							? 'filter-header filter-header-mobile-closed'
							: 'filter-header filter-header-mobile-open'
					}
				>
					<span
						className="close-tab"
						onClick={() => setIsFilterMenuOn(!isFilterMenuOn)}
					>
						{!isFilterMenuOn ? <TbAdjustmentsHorizontal /> : <RxCross2 />}
					</span>
					<h2>Filters</h2>
				</div>

				<div
					className={
						isFilterMenuOn
							? 'filter-types-container filter-types-container-mobile'
							: 'filter-types-container'
					}
				>
					<div className="category-container">
						<h3>Categories</h3>
						<div className="category-input-container">
							{categories
								? categories.map((category) => (
										<label htmlFor={category.name} key={category.id}>
											{category.name}
											<input
												type="checkbox"
												name={category.name}
												id={category.name}
												checked={categoryFilter[category.name]}
												onChange={() =>
													setCategorFilter((prevFilter) => ({
														...prevFilter,
														[category.name]: !categoryFilter[category.name],
													}))
												}
											/>
										</label>
								  ))
								: null}
						</div>
					</div>

					<div className="price-container">
						<h3>Price</h3>
						<div className="price-input-container">
							<label htmlFor="below-200">
								Below $200
								<input
									type="checkbox"
									name="below-200"
									id="below-200"
									checked={priceFilter.below200}
									onChange={() =>
										setPriceFilter((prevFilter) => ({
											...prevFilter,
											below200: !priceFilter.below200,
										}))
									}
								/>
							</label>

							<label htmlFor="201-999">
								$201 - $999
								<input
									type="checkbox"
									name="201-999"
									id="201-999"
									checked={priceFilter.between201and999}
									onChange={() =>
										setPriceFilter((prevFilter) => ({
											...prevFilter,
											between201and999: !priceFilter.between201and999,
										}))
									}
								/>
							</label>

							<label htmlFor="1000-1999">
								$1000 - $1999
								<input
									type="checkbox"
									name="1000-1999"
									id="1000-1999"
									checked={priceFilter.between1000and1999}
									onChange={() =>
										setPriceFilter((prevFilter) => ({
											...prevFilter,
											between1000and1999: !priceFilter.between1000and1999,
										}))
									}
								/>
							</label>

							<label htmlFor="above 2000">
								Over $2000
								<input
									type="checkbox"
									name="above 2000"
									id="above 2000"
									checked={priceFilter.above2000}
									onChange={() =>
										setPriceFilter((prevFilter) => ({
											...prevFilter,
											above2000: !priceFilter.above2000,
										}))
									}
								/>
							</label>
						</div>
					</div>

					<div className="sorting-container">
						<h3>Sort by price</h3>

						<div className="sorting-input-container">
							<label htmlFor="high-to-low">
								Price-high to low
								<input
									type="radio"
									name="price-sorting"
									id="high-to-low"
									checked={sortingFilter.highToLow}
									onChange={() =>
										setSortingFilter((prevFilter) => ({
											...prevFilter,
											highToLow: true,
											lowToHigh: false,
										}))
									}
								/>
							</label>

							<label htmlFor="low-to-high">
								Price-low to high
								<input
									type="radio"
									name="price-sorting"
									id="low-to-high"
									checked={sortingFilter.lowToHigh}
									onChange={() =>
										setSortingFilter((prevFilter) => ({
											...prevFilter,
											highToLow: false,
											lowToHigh: true,
										}))
									}
								/>
							</label>
						</div>
					</div>

					<button className="apply-filters-btn" onClick={() => applyFilters()}>
						Apply Filters
					</button>
				</div>
			</div>
		</div>
	);
};
