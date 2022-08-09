import React, { useEffect, useState } from "react";
// import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const particlesOptions = {
	fpsLimit: 60,
	interactivity: {
		events: {
			onClick: {
				enable: true,
				mode: "push",
			},
			onHover: {
				enable: true,
				mode: "repulse",
			},
			resize: true,
		},
		modes: {
			push: {
				quantity: 4,
			},
			repulse: {
				distance: 200,
				duration: 0.4,
			},
		},
	},
	particles: {
		color: {
			value: "#ffffff",
		},
		links: {
			color: "#ffffff",
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 1,
		},
		collisions: {
			enable: true,
		},
		move: {
			direction: "none",
			enable: true,
			outModes: {
				default: "bounce",
			},
			random: false,
			speed: 3,
			straight: false,
		},
		number: {
			density: {
				enable: true,
				area: 800,
			},
			value: 30,
		},
		opacity: {
			value: 0.5,
		},
		shape: {
			type: "circle",
		},
		size: {
			value: { min: 1, max: 5 },
		},
	},
	detectRetina: true,
};



const App = () => {
	const [input, setInput] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [boxes, setBoxes] = useState([]);
	const [route, setRoute] = useState("signIn");
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState({
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: "",
	});

	const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

	const particlesLoaded = (container) => {
    console.log(container);
  };

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
		const clarifaiFaces = data.outputs[0].data.regions.map(
			(region) => region.region_info.bounding_box
		);

		const image = document.getElementById("input-image");
		const width = Number(image.width);
		const height = Number(image.height);
		return clarifaiFaces.map((face) => {
			return {
				leftCol: face.left_col * width,
				topRow: face.top_row * height,
				rightCol: width - face.right_col * width,
				bottomRow: height - face.bottom_row * height,
			};
		});
	};

	const displayFaceBox = (boxes) => {
		setBoxes(boxes);
		document.getElementById("image-link").value = "";
		setInput("");
	};

	const onInputChange = (event) => {
		setInput(event.target.value);
	};

	const onButtonSubmit = () => {
		setImageUrl(input);
		fetch("https://protected-hollows-76303.herokuapp.com/imageurl", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input: input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch("https://protected-hollows-76303.herokuapp.com/image", {
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
							console.log(user);
						}) // working on the rank, somewhere it isnt pulling through
						.catch(console.log);
				}
				displayFaceBox(calculateFaceLocation(response));
			})
			.catch((error) => console.log("Something went wrong", error));
			console.log(user);

	};

	const onRouteChange = (route) => {
		if (route === "signOut") {
			setInput("");
			setImageUrl("");
			setBoxes([]);
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
			{/* <Particles className="particles" params={particlesOptions} /> */}
			<Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
    />
			<Navigation className="particles" onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
			{route === "home" ? (
				<div>
					<Logo />
					<Rank name={user.name} entries={user.entries} />
					<ImageLinkForm
						onInputChange={onInputChange}
						onButtonSubmit={onButtonSubmit}
					/>
					<FaceRecognition imageUrl={imageUrl} boxes={boxes} />
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
