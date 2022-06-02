import React, { ChangeEvent, FocusEvent, useReducer } from "react";
import styles from "./form.module.css";
import FormButton from "./components/FormButton";
import FormTextArea from "./components/FormTextArea";
import DatePicker from "./components/DatePicker";
import FormInput from "./components/FormInput";
import {
	validateInput,
	validatePhone,
	validateDate,
	validateWebsiteURL,
	validateTextArea,
} from "./utils/validators";

type FormState = {
	firstName: string;
	firstNameError: string;
	lastName: string;
	lastNameError: string;
	phone: string;
	phoneError: string;
	dateOfBirth: string;
	dateOfBirthError: string;
	website: string;
	websiteError: string;
	aboutInfo: string;
	aboutInfoError: string;
	techStack: string;
	techStackError: string;
	project: string;
	projectError: string;
};

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
};

const stateReducer = (state: FormState, updates: Partial<FormState>) => ({
	...state,
	...updates,
});

export default function Form(props: {}, state: FormState) {
	const [formState, dispatchStateUpdates] = useReducer(stateReducer, {
		...DEFAULT_STATE,
	});

	const formSubmitHandler = (e: React.FormEvent) => {
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
			alert("форма содержит ошибки");
			return;
		}

		alert("форма заполнена правильно!");
	};

	const formResetHandler = () => {
		dispatchStateUpdates({ ...DEFAULT_STATE });
	};

	const onInputHandler = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		dispatchStateUpdates({ [e.target.name]: e.target.value });
	};

	const onPhoneInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

	const datepickerChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatchStateUpdates({ dateOfBirth: e.target.value });
	};

	const onBlurHandler = (
		e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		const error = name + "Error";

		dispatchStateUpdates({
			[name]: value.trim(),
			[error]: "",
		});
	};

	return (
		<div>
			<form
				className={styles.form}
				action="/"
				onSubmit={formSubmitHandler}
				onReset={formResetHandler}
			>
				<h2 className={styles.formHeading}>Создание анкеты</h2>

				<div className={styles.formGroup}>
					<FormInput
						labelText="Имя"
						name="firstName"
						errorMessage={state.firstNameError}
						value={state.firstName}
						onInputHandler={onInputHandler}
						onBlurHandler={onBlurHandler}
					/>
					<FormInput
						labelText="Фамилия"
						name="lastName"
						errorMessage={state.lastNameError}
						value={state.lastName}
						onInputHandler={onInputHandler}
						onBlurHandler={onBlurHandler}
					/>
				</div>

				<div className={styles.formGroup}>
					<FormInput
						labelText="Телефон"
						name="phone"
						errorMessage={state.phoneError}
						value={state.phone}
						onInputHandler={onPhoneInputHandler}
						maxLength={12}
						placeholder="7-7777-77-77"
					/>
					<DatePicker
						labelText="Дата рождения"
						untilToday
						value={state.dateOfBirth}
						errorMessage={state.dateOfBirthError}
						onChangeHandler={datepickerChangeHandler}
						name="dateOfBirth"
					/>
				</div>

				<FormInput
					labelText="Сайт"
					name="website"
					errorMessage={state.websiteError}
					value={state.website}
					onInputHandler={onInputHandler}
					onBlurHandler={onBlurHandler}
					placeholder="https://www.website.com"
				/>

				<FormTextArea
					labelText="О себе"
					errorMessage={state.aboutInfoError}
					onInputHandler={onInputHandler}
					name="aboutInfo"
					value={state.aboutInfo}
					onBlurHandler={onBlurHandler}
				/>

				<FormTextArea
					labelText="Стек технологий"
					errorMessage={state.techStackError}
					onInputHandler={onInputHandler}
					name="techStack"
					value={state.techStack}
					onBlurHandler={onBlurHandler}
				/>

				<FormTextArea
					labelText="Описание последнего проекта"
					errorMessage={state.projectError}
					onInputHandler={onInputHandler}
					name="project"
					value={state.project}
					onBlurHandler={onBlurHandler}
				/>

				<div className={styles.buttonsBlock}>
					<FormButton type="reset" text="Отмена" />
					<FormButton type="submit" text="Сохранить" />
				</div>
			</form>
		</div>
	);
}
