import React from "react";

const Navigation = (props) => {
	return props.isSignedIn ? (
		<nav style={{ display: "flex", justifyContent: "flex-end" }}>
			<p
				onClick={() => props.onRouteChange("signOut")}
				className="f3 link dim black underline pa3 pointer"
			>
				Sign Out
			</p>
		</nav>
	) : (
		<nav style={{ display: "flex", justifyContent: "flex-end" }}>
			<p
				onClick={() => props.onRouteChange("signIn")}
				className="f3 link dim black underline pa3 pointer"
			>
				Sign In
			</p>
      <p
				onClick={() => props.onRouteChange("register")}
				className="f3 link dim black underline pa3 pointer"
			>
				Register
			</p>
		</nav>
	);
};

export default Navigation;
