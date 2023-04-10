import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const tweets = []
const users = []

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    const auth = req.headers

    if (!auth) {
        res.status(400).send("UNAUTHORIZED");
        return;
    }

    const newTweet = { id: tweets.length + 1, username, tweet }

    tweets.push(newTweet)
    res.send(newTweet)
})

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body

    if (!username || !avatar) {
        return res.status(422).send("Nao pode havar campos vazios")
    }

    const newUser = { id: users.length + 1, username, avatar }

    users.push(newUser)
    res.status(201).send(newUser)
})

app.get("/tweets", (req, res) => {

    tweets.forEach((t) => {
        const { avatar } = users.find((data) => data.username === t.username);
        t.avatar = avatar
    });

    if (tweets.lenght <= 10) {
        res.send([...tweets])
    } else {
        res.send([...tweets].slice(-10))
    }
})

const port = 5000
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))