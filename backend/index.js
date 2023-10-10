import express,{json} from 'express'
import fetch from 'node-fetch';
import cors from 'cors'
const app = express()
app.use(cors())
app.use(json())
//sugerido poner en variable de entorno .env
const CHATGPT_KEY = 'sk-n1JHxWW<----TUAPIKEY------->pc02qsLhQIkKJqRVySQp'

//RUTA
app.post('/api/miOpenAI', async (req,res)=>{
  const datos = req.body
  const respuesta = await llamarAchatGpt(datos.prompt)
  res.send({data:respuesta})
})


//FUNCION DE LLAMADO A CHATGPET
async function llamarAchatGpt(mensage) {
  const bodyRequest = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: mensage }

    ],
  }
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHATGPT_KEY}`
    },
    body: JSON.stringify(bodyRequest)
  })
  const data = await response.json()
  return data.choices[0].message.content
}

app.listen(3100,()=>{console.log("sevidor iniciado")})