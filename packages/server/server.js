import express from "express";
// const express = require("express");
// const fetch = require("node-fetch");
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 5000;
const API_KEY = "2d1f5fa3-6715-4a63-807b-4a8723d4764c";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", async function (req, res) {
  await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${API_KEY}`)
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

app.listen(port, console.log(`Running on port ${port}`));
