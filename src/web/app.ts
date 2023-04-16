import express from 'express'
import Escolas from '../models/EscolasSP';

const app = express();

async function getEscolas() {
    return await Escolas.findAll();
}

app.get("/", async (req,res) => {
    const escolas = await getEscolas();
    res.send("Hello world")
} )


app.listen(3000, () => {
    console.log('App listening on port 3000!');
  });