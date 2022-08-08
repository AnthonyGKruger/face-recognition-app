import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = (props) => {
	return (
		<div>
			<p className="f3">
				{
					"This web app will detect faces in your pictures, paste a link below and give it a try!"
				}
			</p>
			<div className="center">
				<div className="center form pa4 br3 shadow-5">
					<input
						id="image-link"
						onChange={props.onInputChange}
						type="text"
						className="f4 pa2 w-70 center"
					/>
					<button
						onClick={props.onButtonSubmit}
						className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
					>
						{"Detect"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
