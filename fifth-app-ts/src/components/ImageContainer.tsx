import { useEffect, useRef, useState } from "react";
import spinner from "../spinner.svg";
import styles from "./styles.module.css";

type PropsType = {
	src?: string;
	alt?: string;
};

export default function ImageContainer(props: PropsType) {
	const { src, alt = "" } = props;

	const imageRef = useRef<HTMLImageElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (imageRef.current) {
			imageRef.current.onload = () => setIsLoaded(true);
		}
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
