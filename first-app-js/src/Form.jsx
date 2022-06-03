import React from "react";
import styles from "./form.module.css";
import FormButton from "./components/FormButton";
import FormTextArea from "./components/FormTextArea";
import DatePicker from "./components/DatePicker";
import FormInput from "./components/FromInput";
import PhoneNumberInput from "./components/PhoneNumberInput";

class Form extends React.Component {
	render() {
		return (
			<div>
				<form className={styles.form} action="">
					<h2 className={styles.formHeading}>Создание анкеты</h2>
					<div className={styles.fieldSet}>
						<div className={styles.fieldSetChild}>
							<FormInput labelText="Имя" />
						</div>

						<div className={styles.fieldSetChild}>
							<FormInput labelText="Фамилия" />
						</div>
					</div>

					<div className={styles.fieldSet}>
						<div className={styles.fieldSetChild}>
							<PhoneNumberInput labelText="Телефон" />
						</div>

						<div className={styles.fieldSetChild}>
							<DatePicker labelText="Дата рождения" untilToday />
						</div>
					</div>

					<FormInput labelText="Сайт" />

					<FormTextArea labelText="О себе" />

					<FormTextArea labelText="Стек технологий" />

					<FormTextArea labelText="Описание последнего проекта" />

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
