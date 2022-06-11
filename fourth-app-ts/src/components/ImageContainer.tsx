import { useEffect, useRef, useState } from "react";
import spinner from "../spinner.svg";
import styles from "./styles.module.css";

export default function ImageContainer(props) {
	const { src, alt = "" } = props;

	const imageRef = useRef();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		imageRef.current.onload = () => setIsLoaded(true);
	}, []);

	return (
		<div className={styles.imageContainer}>
			<img
				src={spinner}
				className={`${styles.image} ${isLoaded && styles.hidden}`}
				height={20}
				width={30}
				alt="spinner"
			/>

			<img src={src} alt={alt} ref={imageRef} className={styles.image} />
		</div>
	);
}
