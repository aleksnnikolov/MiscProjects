const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: 123,
			name: "John",
			email: "john@gmail.com",
			password: "cookies",
			entries: 0,
			joined: new Date()
		},
		{
			id: 124,
			name: "Sally",
			email: "sally@gmail.com",
			password: "bananas",
			entries: 0,
			joined: new Date()
		}
	]
}

app.get("/", (req, res) => {
	res.send(database.users);
})


app.post("/signin", (req, res) => {
	database.users.forEach(user => {
		if (req.body.email === user.email &&
			req.body.password === user.password) {
			return res.json(user);
		}
	})

	res.status(400).json("error logging in");
})


app.post("/register", (req, res) => {
	const {email, name, password} = req.body;
	let newId = database.users[database.users.length - 1].id + 1;
	
	database.users.push({
		id: newId,
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length - 1]);
})


app.get("/profile/:id", (req, res) => {
	const {id} = req.params;
	database.users.forEach(user => {
		if (user.id === id) {
			return res.json(user);
		}
	})

	res.status(400).json("user not found");
})


app.put("/image", (req, res) => {
	const {id} = req.body;
	database.users.forEach(user => {
		if (user.id === id) {
			user.entries++;
			return res.json(user.entries);
		}
	})

	res.status(400).json("user not found");
})


app.listen(3000, () => {
	console.log("app is running on port 3000");
});