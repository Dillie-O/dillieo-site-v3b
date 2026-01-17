import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";

export type SiteConfig = {
	title: string;
	subtitle: string;

	themeColor: {
		hue: number;
		fixed: boolean;
		forceDarkMode?: boolean;
	};
	banner: {
		enable: boolean;
		src: string;
		position?: "top" | "center" | "bottom";
		credit: {
			enable: boolean;
			text: string;
			url?: string;
		};
	};
	toc: {
		enable: boolean;
		depth: 1 | 2 | 3;
	};

	favicon: Favicon[];
};

export type Favicon = {
	src: string;
	theme?: "light" | "dark";
	sizes?: string;
};

export enum LinkPreset {
	Home = 0,
	Archive = 1,
	Series = 2,
	About = 3,
	Discoveries = 4,
}

export type NavBarLink = {
	name: string;
	url: string;
	external?: boolean;
};

export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[];
};

export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	links: {
		name: string;
		url: string;
		icon: string;
	}[];
};

export type LicenseConfig = {
	enable: boolean;
	name: string;
	url: string;
};

export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof AUTO_MODE;

export type BlogPostData = {
	body: string;
	title: string;
	published: Date;
	description: string;
	tags: string[];
	draft?: boolean;
	image?: string;
	category?: string;
	prevTitle?: string;
	prevSlug?: string;
	pinned?: boolean;
	nextTitle?: string;
	nextSlug?: string;
	series?: string;
};

export type ExpressiveCodeConfig = {
	theme: string;
};

export type Friend = {
	name: string;
	icon: string;
	description: string;
	url: string;
};

export type FriendCategory = {
	name: string;
	description: string;
	items: Friend[];
};

export type FriendsConfig = {
	categories: FriendCategory[];
};

export type CVSection = {
	title: string;
	type: 'summary' | 'skills' | 'experience' | 'education' | 'projects' | 'contact';
	content?: string;
	items?: CVItem[];
};

export type CVItem = {
	title?: string;
	company?: string;
	period?: string;
	description?: string;
	degree?: string;
	institution?: string;
	category?: string;
	skills?: string[];
	technologies?: string[];
	url?: string;
	achievements?: string[];
	highlights?: string[];
};

export type CVContent = {
	email?: string;
	location?: string;
	linkedin?: string;
	github?: string;
};

export type CVConfig = {
	sections: CVSection[];
};
