// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type Dinosaur = {
		name: string;
		diet: "herbivorous" | "carnivorous" | "omnivorous";
		period: string;
		livedIn: string;
		type: string;
		length: string;
		taxonomy: string[];
		namedBy: string;
		species: string;
		link: string;
	}
}

export {};
