const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			isLogged: false,
			users: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello",

					)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getUsers: async () => {
				try {
					// fetching data from the backend
					const token = getStore().token
					const resp = await fetch(process.env.BACKEND_URL + "/api/users",
						{
							headers: {
								'Authorization': 'Bearer ' + token
							}
						})
					const data = await resp.json();

					setStore({ users: data })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			createToken: async (body) => {

				const resp = await fetch(process.env.BACKEND_URL + "/api/create-token", {
					method: "POST",
					body: JSON.stringify(body),
					mode: "cors",
					headers: {
						'Content-Type': 'application/json',
					}
				});

				const data = await resp.json();

				setStore({ token: data.token })
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
