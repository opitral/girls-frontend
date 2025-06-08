export const loc = {
	age: {
		uk: 'Вік',
		ru: 'Возраст',
		en: 'Age'
	},
	height: {
		uk: 'Зріст',
		ru: 'Рост',
		en: 'Height'
	},
	weight: {
		uk: 'Вага',
		ru: 'Вес',
		en: 'Weight'
	},
	bust: {
		uk: 'Груди',
		ru: 'Грудь',
		en: 'Bust'
	},
	bustSize: {
		uk: 'Розмір грудей',
		ru: 'Размер груди',
		en: 'Bust size'
	},
	price: {
		uk: 'Ціна',
		ru: 'Цена',
		en: 'Price'
	},
	prices: {
		uk: 'Ціни',
		ru: 'Цены',
		en: 'Prices'
	},
	service: {
		uk: 'Послуга',
		ru: 'Услуга',
		en: 'Service'
	},
	services: {
		uk: 'Послуги',
		ru: 'Услуги',
		en: 'Services'
	},
	includedServices: {
		uk: 'Включені послуги',
		ru: 'Включенные услуги',
		en: 'Included services'
	},
	additionalServices: {
		uk: 'Додаткові послуги',
		ru: 'Дополнительные услуги',
		en: 'Additional services'
	},
	showServices: {
		uk: 'Показати інтим-послуги',
		ru: 'Показать интим-услуги',
		en: 'Show intimate services'
	},
	hideServices: {
		uk: 'Сховати інтим-послуги',
		ru: 'Скрыть интим-услуги',
		en: 'Hide intimate services'
	},
	sortDefault: {
		uk: 'Сортувати по замовчуванням',
		ru: 'Сортировать по умолчанию',
		en: 'Default sort'
	},
	sortPriceUp: {
		uk: 'За зростанням ціни',
		ru: 'По возрастанию цены',
		en: 'Price up'
	},
	sortPriceDown: {
		uk: 'За спаданням ціни',
		ru: 'По убыванию цены',
		en: 'Price down'
	},
	sortAgeUp: {
		uk: 'За зростанням віку',
		ru: 'По возрастанию возраста',
		en: 'Age up'
	},
	sortAgeDown: {
		uk: 'За спаданням віку',
		ru: 'По убыванию возраста',
		en: 'Age down'
	},
	sortWeightUp: {
		uk: 'За зростанням ваги',
		ru: 'По возрастанию веса',
		en: 'Weight up'
	},
	sortWeightDown: {
		uk: 'За спаданням ваги',
		ru: 'По убыванию веса',
		en: 'Weight down'
	},
	sortBustUp: {
		uk: 'За зростанням розміру грудей',
		ru: 'По возрастанию роста груди',
		en: 'Bust up'
	},
	sortBustDown: {
		uk: 'За спаданням розміру грудей',
		ru: 'По убыванию роста груди',
		en: 'Bust down'
	},
	totalFound: {
		uk: 'Всього анкет',
		ru: 'Всего анкет',
		en: 'Total found'
	},
	from: {
		uk: 'Від',
		ru: 'От',
		en: 'From'
	},
	to: {
		uk: 'До',
		ru: 'До',
		en: 'To'
	},
	uah: {
		uk: 'грн',
		ru: 'грн',
		en: 'uah'
	},
	toMain: {
		uk: 'На головну',
		ru: 'На главную',
		en: 'To main'
	},
	hoursOne: {
		uk: 'година',
		ru: 'година',
		en: 'hour'
	},
	hoursFew: {
		uk: 'години',
		ru: 'годин',
		en: 'hours'
	},
	hoursMany: {
		uk: 'годин',
		ru: 'годин',
		en: 'hours'
	},
	hasPiercing: {
		uk: 'Має пірсинг',
		ru: 'Имеет пирсинг',
		en: 'Has piercing'
	},
	hasTattoo: {
		uk: 'Має тату',
		ru: 'Имеет тату',
		en: 'Has tattoo'
	},
	night: {
		uk: 'Ніч',
		ru: 'Ночь',
		en: 'Night'
	},
	description: {
		uk: 'Опис',
		ru: 'Описание',
		en: 'Description'
	},
	included: {
		uk: 'Включено',
		ru: 'Включено',
		en: 'Included'
	},
	extra: {
		uk: 'Додатково',
		ru: 'Дополнительно',
		en: 'Extra'
	}
};

export function createLocale(lang: string) {
	return function (key: keyof typeof loc) {
		// @ts-ignore
		return loc[key][lang] ?? loc[key]['uk'];
	};
}
