import { Spin } from "antd"
import React from "react"

function FullPageLoader(props) {
	return (
		<div className="fp-container">
			<Spin size="large" />
		</div>
	)
}

export default FullPageLoader
