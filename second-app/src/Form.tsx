import React, { ChangeEvent, FocusEvent } from "react";
import styles from "./form.module.css";
import FormButton from "./components/FormButton";
import FormTextArea from "./components/FormTextArea";
import DatePicker from "./components/DatePicker";
import FormInput from "./components/FormInput";
import * as validators from "./validators";

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

class Form extends React.Component<{}, FormState> {
	constructor(props: {}) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	formSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const formErrors = {
			firstNameError: validators.validateInput(this.state.firstName),
			lastNameError: validators.validateInput(this.state.lastName),
			phoneError: validators.validatePhone(this.state.phone),
			dateOfBirthError: validators.validateDate(this.state.dateOfBirth),
			websiteError: validators.validateWebsiteURL(this.state.website),
			aboutInfoError: validators.validateTextArea(this.state.aboutInfo),
			techStackError: validators.validateTextArea(this.state.techStack),
			projectError: validators.validateTextArea(this.state.project),
		};

		this.setState({
			...formErrors,
		});

		const isFormValid = Object.values(formErrors).every((errorMessage) => {
			return errorMessage === "";
		});

		if (!isFormValid) {
			alert("форма содержит ошибки");
			return;
		}

		alert("форма заполнена правильно!");
	};

	formResetHandler = () => {
		this.setState({ ...DEFAULT_STATE });
	};

	onInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		this.setState({ [e.target.name]: e.target.value } as Pick<
			FormState,
			keyof FormState
		>);
	};

	onPhoneInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		// разбивка номера на фрагменты
		const n = e.target.value
			.replace(/\D/g, "")
			.match(/(\d{0,1})(\d{0,4})(\d{0,2})(\d{0,2})/);

		if (!n) {
			return;
		}

		const formattedValue = !n[2]
			? n[1]
			: n[1] +
			  "-" +
			  n[2] +
			  (!n[3] ? "" : "-" + n[3] + (!n[4] ? "" : "-" + n[4]));

		this.setState({ phone: formattedValue });
	};

	datepickerChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({ dateOfBirth: e.target.value });
	};

	// trim строки выполняется только при снятии фокуса с input/textarea
	// это позволяет использовать пробелы во время ввода текста
	onBlurHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const currentInputError = e.target.name + "Error";

		this.setState({
			[e.target.name]: e.target.value.trim(),
			[currentInputError]: "",
		} as Pick<FormState, keyof FormState>);
	};

	render() {
		return (
			<div>
				<form
					className={styles.form}
					action="/"
					onSubmit={this.formSubmitHandler}
					onReset={this.formResetHandler}
				>
					<h2 className={styles.formHeading}>Создание анкеты</h2>

					<div className={styles.formGroup}>
						<FormInput
							labelText="Имя"
							name="firstName"
							errorMessage={this.state.firstNameError}
							value={this.state.firstName}
							onInputHandler={this.onInputHandler}
							onBlurHandler={this.onBlurHandler}
						/>
						<FormInput
							labelText="Фамилия"
							name="lastName"
							errorMessage={this.state.lastNameError}
							value={this.state.lastName}
							onInputHandler={this.onInputHandler}
							onBlurHandler={this.onBlurHandler}
						/>
					</div>

					<div className={styles.formGroup}>
						<FormInput
							labelText="Телефон"
							name="phone"
							errorMessage={this.state.phoneError}
							value={this.state.phone}
							onInputHandler={this.onPhoneInputHandler}
							maxLength={12}
							placeholder="7-7777-77-77"
						/>
						<DatePicker
							labelText="Дата рождения"
							untilToday
							value={this.state.dateOfBirth}
							errorMessage={this.state.dateOfBirthError}
							onChangeHandler={this.datepickerChangeHandler}
							name="dateOfBirth"
						/>
					</div>

					<FormInput
						labelText="Сайт"
						name="website"
						errorMessage={this.state.websiteError}
						value={this.state.website}
						onInputHandler={this.onInputHandler}
						onBlurHandler={this.onBlurHandler}
						placeholder="https://www.website.com"
					/>

					<FormTextArea
						labelText="О себе"
						errorMessage={this.state.aboutInfoError}
						onInputHandler={this.onInputHandler}
						name="aboutInfo"
						value={this.state.aboutInfo}
						onBlurHandler={this.onBlurHandler}
					/>

					<FormTextArea
						labelText="Стек технологий"
						errorMessage={this.state.techStackError}
						onInputHandler={this.onInputHandler}
						name="techStack"
						value={this.state.techStack}
						onBlurHandler={this.onBlurHandler}
					/>

					<FormTextArea
						labelText="Описание последнего проекта"
						errorMessage={this.state.projectError}
						onInputHandler={this.onInputHandler}
						name="project"
						value={this.state.project}
						onBlurHandler={this.onBlurHandler}
					/>

					<div className={styles.buttonsBlock}>
						<FormButton type="reset" text="Отмена" />
						<FormButton type="submit" text="Сохранить" />
					</div>
				</form>
			</div>
		);
	}
}

export default Form;
