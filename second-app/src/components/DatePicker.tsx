import React from "react";
import styles from "../form.module.css";

type DatePickerProps = {
	errorMessage: string;
	labelText: string;
	name: string;
	untilToday?: boolean;
	value: string;
	onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

class DatePicker extends React.Component<DatePickerProps> {
	render() {
		// если значение в атрибуте max не удовлетворяет формату yyyy-MM-dd,
		// то элемент не будет иметь максимальной даты
		const maxDate = this.props.untilToday
			? new Date().toLocaleDateString("en-ca")
			: "";

		return (
			<div className={styles.formSubBlock}>
				<label className={styles.label}>{this.props.labelText}</label>
				<div className={styles.inputBlock}>
					<input
						type="date"
						placeholder=""
						className={styles.datePicker}
						max={maxDate}
						value={this.props.value}
						onChange={this.props.onChangeHandler}
						name={this.props.name}
					/>
					<p className={styles.errorMessage}>{this.props.errorMessage}</p>
				</div>
			</div>
		);
	}
}

export default DatePicker;
