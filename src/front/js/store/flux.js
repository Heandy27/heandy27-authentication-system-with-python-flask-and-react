
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth_admin: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
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
			},

			loginUser: async (email,password) => {
				try {
					const response = await fetch (process.env.BACKEND_URL + "api/login", {
						method: "POST",
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({ email: email, password: password })
					})
					const data = await response.json()
					if(!response.ok){
						throw new Error("Salio un error en hacer login")
					}
					localStorage.setItem("token", data.access_token)
					console.log(data);
					setStore({user: data.user})
					return true
				} catch (error) {
					alert(error)
				}
			},
			
			/*

			login: (email, password)=>{
				console.log(email, password);
				fetch(process.env.BACKEND_URL + "api/login", {
					method: "POST",
					body: JSON.stringify({ email: email, password: password }),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then((response => {
					
					if (response.status === 200){
						response.json()
					} else {
						alert("Hiciste algo mal")
					}
						
					return response.json()
				}))
				.then((data)=>{
					console.log(data);
					setStore({ auth_admin: true })
					localStorage.setItem("token", data.access_token)})
				.catch((error)=>{error})
			   },
*/
			   registerUser: async (email,password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ email: email, password: password })
					})
					const data = await response.json()
					if (!response.ok) {
						throw new  Error("Error al registrarse")
					}
					console.log(data);
					return true
				} catch (error) {
					alert(error)

				}
			   },
			/*
			   register: (email, password) => {
				fetch(process.env.BACKEND_URL + "api/signup", {
					method: "POST",
					body: JSON.stringify({ email: email, password: password }),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then((response => {
					if (response.ok){
						console.log(response.status)
					}
					return response.json()
				}))
				.then((data)=>{
					console.log(data);
					localStorage.setItem("token", data.access_token)})
				.catch((error)=>{error})
			   },
				*/

			   getMyTasks: () => {
				const token = localStorage.getItem('token')
				fetch(process.env.BACKEND_URL + "api/private", {
					method: "GET",
					body: JSON.stringify({ email: email, password: password }),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer' + token
					}
				})
				.then((response => {
					if (response.ok){
						console.log(response.status)
					}
					return response.json()
				}))
				.then((data)=>{
					console.log(data);

				})
				.catch((error)=>{error})
			   
			   },
			   userLogout: () => {
				let store = getStore()
				setStore({...store, user:{}})
			   }
			   
		
		}

	};
};

export default getState;
