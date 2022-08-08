import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import companyLogo from './logo_transparent.png'

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt
				className="Tilt bg-white br2 shadow-3"
				options={{ max: 55 }}
				style={{ height: 150, width: 150 }}
			>
				<div className="Tilt-inner"> <img src={companyLogo} alt="logo"/> </div>
			</Tilt>
		</div>
	);
};

export default Logo;
