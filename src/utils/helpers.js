export const slugify = (text) => text.toString().toLowerCase().normalize("NFD").trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-")

export const DateFormat = (date_string) => {

	const date = new Date(Date(Date.parse(date_string)))

	// date.toLocaleTimeString()

	return date.toLocaleDateString()
}

export const MoneyFormat = (number) => [...String(number)].reverse().reduce((acc, x, i, arr)=> [...acc, (i%3===0 ? `${x}\xa0` : x)], []).reverse().join('')

export const ThemeToggle = () => {
	if (document.body.classList.contains('dark')) {
		LightenTheme()
	} else {
		DarkenTheme()
	}
}

export const DarkenTheme = () => {
	document.body.classList = ["dark"]
	localStorage.setItem('theme', 'dark')
}

export const LightenTheme = () => {
	document.body.classList = []
	localStorage.setItem('theme', 'light')
}

export const  postData = (obj, n = []) => {
	let newObj = structuredClone(obj)
	for(let el in newObj){
	  if(n.includes(el)){
			delete newObj[el]
	  }
	}
	return newObj
}

export const shortTitle = (title) =>{
	return title.length > 20 ? title.splice(0, 20) + '...' : title
}

export const getParentId = (categories, id) =>{
	let pp_id = 0

	categories?.forEach(parent_parent => {
		if(parent_parent.id === id && pp_id === 0)
			pp_id = parent_parent.id

		parent_parent.children.forEach(parent => {
			if(parent.id === id && pp_id === 0)
				pp_id = parent_parent.id

			parent.children.forEach(child => {
				if(child.id === id && pp_id === 0)
					pp_id = parent.id
			})
		})
	})

	return pp_id
}

export const getParentParentId = (categories, id) => {
	let pp_id = 0
	let p_id = 0
	let ch_id = 0

	categories?.forEach(parent_parent => {
		if(parent_parent.id === id){
			pp_id = parent_parent.id
		}else{
			parent_parent?.children?.forEach(parent => {
				if(parent.id === id){
					p_id = parent.id
					pp_id = parent.parent_id
				}else{
					parent?.children?.forEach(child => {
						if(child.id === id){
							ch_id = child.id
							p_id = child.parent_id
							pp_id = getParentId(categories, child.parent_id)
						}
					})
				}
			})
		}
	})

	return [pp_id, p_id, ch_id]
}





