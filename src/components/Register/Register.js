import React from "react";
import { useState } from "react";

const Register = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const onEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const onPasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const onNameChange = (event) => {
		setName(event.target.value);
	};

	const onSubmitRegister = () => {
		fetch("https://protected-hollows-76303.herokuapp.com/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password,
				name: name,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					props.loadUser(user);
					props.onRouteChange("home");
				}
			});
	};

	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
			<main className="pa4 black-80">
				<div className="measure">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						<legend className="f1 fw6 ph0 mh0">Register</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="name">
								Name
							</label>
							<input
								autoComplete="true"
								className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="text"
								name="name"
								id="name"
								onChange={onNameChange}
							/>
						</div>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="email-address">
								Email
							</label>
							<input
								autoComplete="true"
								className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="email"
								name="email-address"
								id="email-address"
								onChange={onEmailChange}
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">
								Password
							</label>
							<input
								autoComplete="true"
								className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="password"
								name="password"
								id="password"
								onChange={onPasswordChange}
							/>
						</div>
					</fieldset>
					<div className="">
						<input
							className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
							type="submit"
							value="Register"
							onClick={onSubmitRegister}
						/>
					</div>
					<div className="lh-copy mt3">
						<p
							onClick={() => props.onRouteChange("signIn")}
							className="pointer f6 link dim black db"
						>
							Sign In
						</p>
					</div>
				</div>
			</main>
		</article>
	);
};

export default Register;
