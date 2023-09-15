//route params
app.get("/message/:id", (request,response) => {

  response.send(`Id da mensagem ${request.params.id}`)
})

//query params
app.get("/usuarios", (request,response) => {
  const {name , idade } = request.query

  response.send(`name: ${name}. idade: ${idade}`)
})