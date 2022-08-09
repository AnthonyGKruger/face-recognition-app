import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = (props) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img
					id="input-image"
					src={props.imageUrl}
					alt="image being recognized"
					width="500px"
					height="auto"
				/>
				{/* <div
					className="bounding-box"
					style={{
						top: props.boxes.topRow,
						right: props.boxes.rightCol,
						bottom: props.boxes.bottomRow,
						left: props.boxes.leftCol,
					}}
				></div> */}
				{props.boxes.map((box, i) => {
					const { topRow, rightCol, bottomRow, leftCol } = box;
					return (
						<div
							className="bounding-box"
							key={i}
							id="face"
							style={{
								top: topRow,
								right: rightCol,
								bottom: bottomRow,
								left: leftCol,
							}}
						></div>
					);
				})}
			</div>
		</div>
	);
};

export default FaceRecognition;
