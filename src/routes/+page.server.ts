import { parseCsv } from '$lib/DataParser';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const data = await fetch('/dino_data.csv').then((res) => res.text());
	let parsedData: Dinosaur[] = parseCsv(data)

	return { parsedData }
};