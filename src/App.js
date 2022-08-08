import React, { useEffect, useState } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800,
			},
		},
	},
};

const App = () => {
	const [input, setInput] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [box, setBox] = useState({});
	const [route, setRoute] = useState("signIn");
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState({
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: "",
	});

	const loadUser = (data) => {
		setUser({
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined,
		});
	};

	const calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;

		const image = document.getElementById("input-image");
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	const displayFaceBox = (box) => {
		setBox(box);
		document.getElementById("image-link").value = "";
		setInput("");
	};

	const onInputChange = (event) => {
		setInput(event.target.value);
	};

	const onButtonSubmit = () => {
		setImageUrl(input);
		fetch("http://localhost:3000/imageurl", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input:input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch("http://localhost:3000/image", {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: user.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => {
							// console.log(count);
							setUser(Object.assign(user, { entries: count }));
							// console.log(user);
						}) // working on the rank, somewhere it isnt pulling through
						.catch(console.log);
				}
				displayFaceBox(calculateFaceLocation(response));
			})
			.catch((error) => console.log("Something went wrong", error));
	};

	const onRouteChange = (route) => {
		if (route === "signOut") {
			setInput("");
			setImageUrl("");
			setBox({});
			setUser({
				id: "",
				name: "",
				email: "",
				entries: 0,
				joined: "",
			});
			setIsSignedIn(false);
		} else if (route === "home") {
			setIsSignedIn(true);
		}

		setRoute(route);
	};

	return (
		<div className="App">
			<Particles className="particles" params={particlesOptions} />
			<Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
			{route === "home" ? (
				<div>
					<Logo />
					<Rank name={user.name} entries={user.entries} />
					<ImageLinkForm
						onInputChange={onInputChange}
						onButtonSubmit={onButtonSubmit}
					/>
					<FaceRecognition imageUrl={imageUrl} box={box} />
				</div>
			) : route === "signIn" || route === "signOut" ? (
				<SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
			) : (
				<Register loadUser={loadUser} onRouteChange={onRouteChange} />
			)}
		</div>
	);
};

export default App;
