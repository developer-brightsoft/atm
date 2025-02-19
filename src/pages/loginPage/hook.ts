import { AxiosResponse } from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginServices } from "../../services/login.service";
import { FormValues } from "./type";

export default function useSignInForm() {
	const [isSignIn, setIsSignIn] = useState(true);
	const history = useHistory();
	async function handleLogin(
		values: FormValues,
		formikHelpers: FormikHelpers<FormValues>
	) {
		try {
			const { email, password } = values;
			const resp: AxiosResponse = await loginServices.login({ email, password });
			// console.log(resp);
			const { data } = resp;
			if (resp && resp.status === 200) {
				// check user or password is exit or not
				if (data && !data.sign && data.message === "wrong password !") {
					//not
					formikHelpers.setErrors({ email: "email or password is wrong" });
				} else if (data && data.user && data.message === "Login successfully !") {
					//redirect to atm page
					history.push("/");
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
	async function handleSignUp(
		values: FormValues,
		formikHelpers: FormikHelpers<FormValues>
	) {
		try {
			const { email, password } = values;
			const resp: AxiosResponse = await loginServices.register({
				email,
				password,
			});
			console.log(resp);
			if (resp.data === "email already exists !") {
				//toastify
				formikHelpers.setErrors({ email: "email already exists ! " });
			}
			if (resp && resp.status === 200 && resp.data !== "email already exists !") {
				history.push("/");
			}
		} catch (err) {
			console.log(err);
		}
	}
	function changeForm() {
		setIsSignIn(!isSignIn);
	}
	const handleSubmitForm = isSignIn ? handleLogin : handleSignUp;

	return { isSignIn, handleSubmitForm, changeForm };
}
