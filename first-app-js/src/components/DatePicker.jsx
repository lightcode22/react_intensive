import React from "react";
import styles from "../form.module.css";

class DatePicker extends React.Component {
	render() {
		// если значение в атрибуте max не удовлетворяет формату yyyy-MM-dd,
		// то элемент не будет иметь максимальной даты
		const maxDate = this.props.untilToday
			? new Date().toLocaleDateString("en-ca")
			: "";

		return (
			<>
				<label className={styles.label}>{this.props.labelText}</label>
				<input
					name="dateOfBirth"
					type="date"
					placeholder=""
					className={styles.datePicker}
					max={maxDate}
				/>
			</>
		);
	}
}

export default DatePicker;
