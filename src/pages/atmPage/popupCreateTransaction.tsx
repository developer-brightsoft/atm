import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function PopUpCreateTransaction() {
	return (
		<Popup trigger={<button> Trigger</button>} position="center center">
			<div>Popup content here !!</div>
		</Popup>
	);
}
