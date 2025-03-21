from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get('/exemplo')
def hello_world() -> str:
    return 'Helloo'

@app.post('/post')
def postar_algo() -> list:
    lista = []
    for i in range(0,10):
        lista.append(i)
    return lista
    

if __name__ == "__main__":
    uvicorn.run(app, port = 8000)