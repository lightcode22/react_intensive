import React, { ChangeEvent, FocusEvent, useReducer } from "react";
import styles from "./form.module.css";
import Modal from "./components/Modal";
import FormButton from "./components/Form/FormButton";
import FormTextArea from "./components/Form/FormTextArea";
import DatePicker from "./components/Form/DatePicker";
import FormInput from "./components/Form/FormInput";
import {
	validateInput,
	validatePhone,
	validateDate,
	validateWebsiteURL,
	validateTextArea,
} from "./utils/validators";

const DEFAULT_STATE = {
	firstName: "",
	firstNameError: "",
	lastName: "",
	lastNameError: "",
	phone: "",
	phoneError: "",
	dateOfBirth: "",
	dateOfBirthError: "",
	website: "",
	websiteError: "",
	aboutInfo: "",
	aboutInfoError: "",
	techStack: "",
	techStackError: "",
	project: "",
	projectError: "",
	isModalOpen: false,
	modalMessage: "",
};

const stateReducer = (state, updates) => ({
	...state,
	...updates,
});

export default function Form(props, state) {
	const [formState, dispatchStateUpdates] = useReducer(stateReducer, {
		...DEFAULT_STATE,
	});

	const onFormSubmitHandler = (e) => {
		e.preventDefault();

		const formErrors = {
			firstNameError: validateInput(formState.firstName),
			lastNameError: validateInput(formState.lastName),
			phoneError: validatePhone(formState.phone),
			dateOfBirthError: validateDate(formState.dateOfBirth),
			websiteError: validateWebsiteURL(formState.website),
			aboutInfoError: validateTextArea(formState.aboutInfo),
			techStackError: validateTextArea(formState.techStack),
			projectError: validateTextArea(formState.project),
		};

		dispatchStateUpdates({
			...formErrors,
		});

		const isFormValid = Object.values(formErrors).every(
			(errorMessage) => errorMessage === ""
		);

		if (!isFormValid) {
			dispatchStateUpdates({
				isModalOpen: true,
				modalMessage: "форма содержит ошибки",
			});
			return;
		}

		dispatchStateUpdates({
			isModalOpen: true,
			modalMessage: "форма заполнена правильно",
		});
	};

	const formResetHandler = () => {
		dispatchStateUpdates({ ...DEFAULT_STATE });
	};

	const onInputHandler = (e) => {
		dispatchStateUpdates({ [e.target.name]: e.target.value });
	};

	const onPhoneInputHandler = (e) => {
		// разбивка номера на фрагменты
		const numParts = e.target.value
			.replace(/\D/g, "")
			.match(/(\d{0,1})(\d{0,4})(\d{0,2})(\d{0,2})/);

		if (!numParts) {
			return;
		}

		const formattedValue = !numParts[2]
			? numParts[1]
			: numParts[1] +
			  "-" +
			  numParts[2] +
			  (!numParts[3]
					? ""
					: "-" + numParts[3] + (!numParts[4] ? "" : "-" + numParts[4]));

		dispatchStateUpdates({ phone: formattedValue });
	};

	const datepickerChangeHandler = (e) => {
		dispatchStateUpdates({ dateOfBirth: e.target.value });
	};

	const onBlurHandler = (e) => {
		const { name, value } = e.target;

		const error = name + "Error";

		dispatchStateUpdates({
			[name]: value.trim(),
			[error]: "",
		});
	};

	const onModalCloseHandler = () => {
		dispatchStateUpdates({ isModalOpen: false });
	};

	return (
		<div>
			<form
				className={styles.form}
				action="/"
				onSubmit={onFormSubmitHandler}
				onReset={formResetHandler}
			>
				<h2 className={styles.formHeading}>Создание анкеты</h2>

				<div className={styles.formGroup}>
					<FormInput
						labelText="Имя"
						name="firstName"
						errorMessage={formState.firstNameError}
						value={formState.firstName}
						onInputHandler={onInputHandler}
						onBlurHandler={onBlurHandler}
					/>
					<FormInput
						labelText="Фамилия"
						name="lastName"
						errorMessage={formState.lastNameError}
						value={formState.lastName}
						onInputHandler={onInputHandler}
						onBlurHandler={onBlurHandler}
					/>
				</div>

				<div className={styles.formGroup}>
					<FormInput
						labelText="Телефон"
						name="phone"
						errorMessage={formState.phoneError}
						value={formState.phone}
						onInputHandler={onPhoneInputHandler}
						maxLength={12}
						placeholder="7-7777-77-77"
					/>
					<DatePicker
						labelText="Дата рождения"
						untilToday
						value={formState.dateOfBirth}
						errorMessage={formState.dateOfBirthError}
						onChangeHandler={datepickerChangeHandler}
						name="dateOfBirth"
					/>
				</div>

				<FormInput
					labelText="Сайт"
					name="website"
					errorMessage={formState.websiteError}
					value={formState.website}
					onInputHandler={onInputHandler}
					onBlurHandler={onBlurHandler}
					placeholder="https://www.website.com"
				/>

				<FormTextArea
					labelText="О себе"
					errorMessage={formState.aboutInfoError}
					onInputHandler={onInputHandler}
					name="aboutInfo"
					value={formState.aboutInfo}
					onBlurHandler={onBlurHandler}
				/>

				<FormTextArea
					labelText="Стек технологий"
					errorMessage={formState.techStackError}
					onInputHandler={onInputHandler}
					name="techStack"
					value={formState.techStack}
					onBlurHandler={onBlurHandler}
				/>

				<FormTextArea
					labelText="Описание последнего проекта"
					errorMessage={formState.projectError}
					onInputHandler={onInputHandler}
					name="project"
					value={formState.project}
					onBlurHandler={onBlurHandler}
				/>

				<div className={styles.buttonsBlock}>
					<FormButton type="reset" text="Отмена" />
					<FormButton type="submit" text="Сохранить" />
				</div>
			</form>

			<Modal
				isOpen={formState.isModalOpen}
				message={formState.modalMessage}
				onClose={onModalCloseHandler}
			/>
		</div>
	);
}
