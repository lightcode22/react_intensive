import React from "react";
import styles from "../form.module.css";

class DatePicker extends React.Component {
	render() {
		const {
			value,
			name,
			labelText,
			errorMessage,
			untilToday,
			onChangeHandler,
		} = this.props;

		// если значение в атрибуте max не удовлетворяет формату yyyy-MM-dd,
		// то элемент не будет иметь максимальной даты
		const maxDate = untilToday ? new Date().toLocaleDateString("en-ca") : "";

		return (
			<div className={styles.formSubBlock}>
				<label className={styles.label}>{labelText}</label>
				<div className={styles.inputBlock}>
					<input
						type="date"
						placeholder=""
						className={styles.datePicker}
						max={maxDate}
						value={value}
						onChange={onChangeHandler}
						name={name}
					/>
					<p className={styles.errorMessage}>{errorMessage}</p>
				</div>
			</div>
		);
	}
}

export default DatePicker;
