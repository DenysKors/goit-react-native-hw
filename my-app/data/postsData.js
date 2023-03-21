export const postsScreenData = [
	{
		img: "../assets/images/forest.jpg",
		title: "Лес",
		location: "Ivano-Frankivs'k Region, Ukraine",
		comments: 3,
	},
	{
		img: "../assets/images/sunset.jpg",
		title: "Закат на Черном море",
		location: "Odessa, Ukraine",
		comments: 5,
	},
	{
		img: "../assets/images/sunset.jpg",
		title: "Закат на Черном море",
		location: "Odessa, Ukraine",
		comments: 2,
	},
];

export const commentScreenData = [
	{
		id: 1,
		date: "09 июня, 2020",
		time: "08:40",
		userAvatar: require("../assets/images/guest-image-sm.jpg"),
		text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
	},
	{
		id: 2,
		userAvatar: require("../assets/images/user-image-sm.jpg"),
		date: "09 июня, 2020",
		time: "09:14",
		text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
	},
	{
		id: 3,
		date: "09 июня, 2020",
		time: "09:20",
		userAvatar: require("../assets/images/guest-image-sm.jpg"),
		text: "Thank you! That was very helpful!",
	},
];

export const profileScreenData = [
	{
		id: 1,
		img: require("../assets/images/forest.jpg"),
		title: "Лес",
		location: "Ukraine",
		comments: 3,
		likes: 153,
	},
	{
		id: 2,
		img: require("../assets/images/sunset.jpg"),
		title: "Закат на Черном море",
		location: "Ukraine",
		comments: 5,
		likes: 200,
	},
	{
		id: 3,
		img: require("../assets/images/house.jpg"),
		title: "Старый домик в Венеции",
		location: "Italy",
		comments: 2,
		likes: 200,
	},
];
