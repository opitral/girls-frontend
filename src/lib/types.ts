export type ServisesData = {
	order: number;
	id: number;
	name_localized: string;
}[];

export type GirlsShortData = {
	id: number;
	name: string;
	height: number;
	weight: number;
	is_verified: boolean;
	age: number;
	main_photo: string;
	min_price: number;
}[];

export type GirlFullData = {
	lang: string;
	params: {
		service_ids: Array<any>;
	};
	name: string;
	phone: string;
	telegram: string;
	whatsapp: string;
	height: number;
	weight: number;
	breast_size: number;
	has_tattoo: boolean;
	has_piercing: boolean;
	is_verified: boolean;
	id: number;
	photos: Array<{
		file_url: string;
		order: number;
	}>;
	prices: Array<{
		hours: number;
		current_cost: number;
		old_cost?: number;
	}>;
	services: Array<{
		additional_cost: number;
		name_localized: string;
	}>;
	hair_color_localized: string;
	ethnicity_localized: string;
	body_type_localized: string;
	breast_type_localized: string;
	age: number;
	description_localized: string;
};
