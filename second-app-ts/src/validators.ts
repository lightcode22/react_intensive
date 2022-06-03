export const validateWebsiteURL = (url: string) => {
	if (url === "") {
		return "Поле пустое. Заполните, пожалуйста.";
	}

	let regex = new RegExp(
		/https:\/\/(?!w{1,2}\.)(?:www\.)?([^\.\/][\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/
	);

	if (!url.match(regex)) {
		return "URL должен соответствовать маске https://www.website.com";
	}

	return "";
};

export const validatePhone = (value: string) => {
	if (value === "") {
		return "Поле пустое. Заполните, пожалуйста.";
	}

	if (value.length < 12) {
		return "Неверный формат номера";
	}

	return "";
};

export const validateInput = (value: string) => {
	if (value === "") {
		return "Поле пустое. Заполните, пожалуйста.";
	}

	if (value[0] === value[0].toLowerCase()) {
		return "Укажите с заглавной буквы";
	}

	return "";
};

export const validateTextArea = (value: string) => {
	if (value === "") {
		return "Поле пустое. Заполните, пожалуйста.";
	}

	return "";
};

export const validateDate = (value: string) => {
	if (value === "") {
		return "Поле пустое. Заполните, пожалуйста.";
	}

	return "";
};
