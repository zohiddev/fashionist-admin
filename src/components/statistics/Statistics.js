import React from "react"
import BoxIcon from "../icons/BoxIcon"

function Statistics() {
	const data = [
		{
			id: 1,
			icon: <BoxIcon />,
			title: "Mahsulotlar",
			number: 245,
		},
		{
			id: 2,
			icon: <BoxIcon />,
			title: "Foydalanuvchilar",
			number: 1147,
		},
		{
			id: 3,
			icon: <BoxIcon />,
			title: "Daromad",
			number: "45.000.000 so’m",
		},
		{
			id: 4,
			icon: <BoxIcon />,
			title: "Buyurtmalar",
			number: 318,
		},
		{
			id: 5,
			icon: <BoxIcon />,
			title: "Buyurtmalar",
			number: 17,
		},
		{
			id: 6,
			icon: <BoxIcon />,
			title: "Izohlar",
			number: 140,
		},
	]
	return (
		<div className="statistics">
			<div className="statistics__row">
				{data.map((item) => {
					return (
						<div className="statistics__block" key={item.id}>
							<div className="statistics__icon">
								<span>{item.icon}</span>
							</div>

							<div className="statistics__content">
								<p className="statistics__text">{item.title}</p>

								<p className="statistics__number">
									{item.number}
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Statistics
