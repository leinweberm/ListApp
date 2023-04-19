const themes = {
	light: {
		p_background: '#F8F8F8',
		s_background: '#E9E9E9',
		border: '#ADADAD',
		error: '#DB1A1A',
		warning: '#F8A000',
		success: '#308800',
		active: '#007AC7',
		disabled: '#ADADAD',
		primary: '#0092E1',
		secondary: '#58B8EE',
		text_color: '#868686',
		headings_color: '#333333',
		bold_color: '#868686',
		italic_color: '#868686',
		link: '#0062BC',
	},
	dark: {
		p_background: '#121212',
		s_background: '#1A1A1A',
		border: '#333333',
		error: '#DB5A58',
		warning: '#EBAB39 ',
		success: '#308800',
		active: '#2C9CD9',
		disabled: '#494949',
		primary: '#00ADFF',
		secondary: '#58B8EE',
		text_color: '#ABABAB',
		headings_color: '#DEDEDE',
		bold_color: '#DEDEDE',
		italic_color: '#ABABAB',
		link: '#2C9CD9',
	}
};

export const setTheme = (theme) => {
	if (themes[theme]) {
		const root = document.documentElement;
		root.style.setProperty('--background', themes[theme].p_background);
		root.style.setProperty('--secondary-background', themes[theme].s_background);
		root.style.setProperty('--border', themes[theme].border);
		root.style.setProperty('--error', themes[theme].error);
		root.style.setProperty('--warning', themes[theme].warning);
		root.style.setProperty('--success', themes[theme].success);
		root.style.setProperty('--active', themes[theme].active);
		root.style.setProperty('--disabled', themes[theme].disabled);
		root.style.setProperty('--primary', themes[theme].primary);
		root.style.setProperty('--secondary', themes[theme].secondary);
		root.style.setProperty('--text-color', themes[theme].text_color);
		root.style.setProperty('--headings-color', themes[theme].headings_color);
		root.style.setProperty('--bold-color', themes[theme].bold_color);
		root.style.setProperty('--italic-color', themes[theme].italic_color);
		root.style.setProperty('--link', themes[theme].link);
	}
};