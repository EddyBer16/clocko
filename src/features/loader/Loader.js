import './Loader.css'

export default function Skeleton() {
	let skeletonItems = []
	for (let i = 1; i <= 5; i++) {
		skeletonItems.push(
			<article class="City City--loading">
				<div class="City__info--loading">
					<div class="Skeleton__item City__name--loading"></div>
					<div class="Skeleton__item City__country--loading"></div>
				</div>
				<div class="Skeleton__item City__time--loading"></div>
			</article>
		)
	}

	return (
		<section class="Skeleton">
			{skeletonItems}
		</section>
	)
}
