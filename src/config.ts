import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Sup-a-Dillie-O",
	subtitle: "Coding, Pensee, Esoterica",
	themeColor: {
		hue: 275, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true, // Hide the theme color picker for visitors
		forceDarkMode: false, // Force dark mode and hide the light/dark switcher
	},
	banner: {
		enable: true,
		src: "images/family_hero.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		   {
		     src: '/favicon/cottage_favicon.webp',
		//   theme: 'light', 
		//   sizes: '32x32',
		   }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Series,
		LinkPreset.About,
		LinkPreset.Friends,
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "images/about_avatar.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/' 原assets/images/demo-avatar.png,可选https://q2.qlogo.cn/headimg_dl?dst_uin=189563385&spec=0
	name: "Sean Patterson",
	bio: "Bonum, Veritas, Pulcher, Technae",
	links: [
		{
			name: "LinkedIn",
			icon: "fa6-brands:linkedin",
			url: "https://www.linkedin.com/in/dillieo/",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/dillie-o",
		},
		{
			name: "Instagram",
			icon: "fa6-brands:instagram",
			url: "https://instagram.com/dillieo",
		},		
		{
			name: "StackOverflow",
			icon: "fa6-brands:stack-overflow",
			url: "https://stackoverflow.com/users/71/dillie-o",
		},
		{
			name: "StoryGraph",
			icon: "fa6-brands:goodreads",
			url: "https://app.thestorygraph.com/profile/dillieo",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
