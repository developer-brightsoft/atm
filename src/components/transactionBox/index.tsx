import React from "react";
import { TransactionBoxStyle } from "./styles";
import user from "../../assets/image/user.png";
import atm from "../../assets/image/atm.png";
import { Form, Formik } from "formik";
import {
	createATMSchema,
	createTransactionSchema,
	initialValueATM,
	initialValueTransaction,
} from "./transactionBox";
import { useHandlerTransactionsBox } from "../../hooks/useHandlerTransactionsBox";
import InputCustom from "../InputCustom";
function TransactionBox() {
	const { isdataBox, addNew, hiddenBox } = useHandlerTransactionsBox();
	const initialValues: any =
		isdataBox === "transition" ? initialValueTransaction : initialValueATM;

	return (
		<TransactionBoxStyle>
			<div className="transaction-box">
				<h5>{isdataBox === "transition" ? "Create transaction" : "Create ATM"}</h5>
				<div className="image-container">
					<img
						src={isdataBox === "transition" ? user : atm}
						alt={isdataBox === "transition" ? "user" : "atm"}
					/>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={
						isdataBox === "transition" ? createTransactionSchema : createATMSchema
					}
					onSubmit={addNew}
				>
					<Form>
						<InputCustom
							name={isdataBox === "transition" ? "namePeople" : "name"}
							placeholder={isdataBox === "transition" ? "add user name" : "add ATM"}
						/>
						{isdataBox === "transition" && (
							<InputCustom name="transaction" placeholder="add transaction number" />
						)}
						<div className="group-bottom">
							<button type="button" className="btn-danger" onClick={hiddenBox}>
								Cancle
							</button>

							<button type="submit" className="btn-primitive ">
								Create
							</button>
						</div>
					</Form>
				</Formik>
			</div>
		</TransactionBoxStyle>
	);
}

export default TransactionBox;
