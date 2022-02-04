const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

app.get('/stocks', async (req, res) => {
  const stockSymbols = await stocks.getStocks()
  res.send({ stockSymbols })
})

app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req
  const data = await stocks.getStockPoints(symbol, new Date())
  try{
    if(data == null) throw new Error("No data for this stock.");
  }
  catch(err){
    console.error(err);
  }
  res.send(data)
})

app.listen(3000, () => console.log('Server is running!'))
