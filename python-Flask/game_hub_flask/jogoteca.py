from flask import Flask, render_template, request, redirect, session, flash
from flask_toastr import Toastr


class Jogo:
    def __init__(self, nome:str, categoria:str, console:str):
        self.nome = nome
        self.categoria = categoria
        self.console = console

class Usuario:
    def __init__(self, nome, nickname, senha):
        self.nome = nome
        self.nickname = nickname
        self.senha = senha        

usuario1 = Usuario("adib", "said", "54321")
usuario2 = Usuario("joao paulo", "hosn", "12345")
usuario3 = Usuario("Amelie", "Meha", "56789")

usuarios = { usuario1.nickname :usuario1, 
                usuario2.nickname :usuario2,
                usuario3.nickname :usuario3 }


app = Flask(__name__)
app.secret_key = 'adibao'
toastr = Toastr(app)

jogo1 = Jogo('Rainbow Six', 'FPS', 'PS4')
jogo2 = Jogo('CSGO', 'FPS', 'PC')
lista_jogos = [jogo1, jogo2]

@app.route('/')
def index():
    return render_template('lista.html', titulo = 'Jogos', jogos = lista_jogos)

@app.route('/tela_cadastro')
def exibir_tela():
    if 'usuario_logado' not in session or session['usuario_logado'] is None:
        return redirect('/login?proxima=novo')
    return render_template('tela.html', titulo = 'Tela de Cadastro')

@app.route('/criar', methods = ['POST',])
def criar():
    nome = request.form['nome']
    categoria = request.form['categoria']
    console = request.form['console']
    novo_jogo = Jogo(nome, categoria, console)

    lista_jogos.append(novo_jogo)
    return redirect('/')
    
@app.route("/login")
def login():
    proxima = request.args.get('proxima')
    return render_template('login.html', proxima = proxima)

@app.route("/autenticar", methods = ['POST',])
def autenticar():
    if request.form['usuario'] in usuarios:
        usuario = usuarios[request.form['usuario']]
        if request.form['senha'] == usuario.senha:
            session['usuario_logado'] = usuario.nickname
            flash(f'{usuario.nickname} logado com sucesso')
            proxima_pagina = request.form.get('proxima', '/')
            if proxima_pagina in [None, "None", ""]:
                proxima_pagina = "/tela_cadastro"            
                return redirect(proxima_pagina)
        else:
            flash('Senha incorreta')
            return redirect('/login')
    else:
        flash('Usuário não encontrado')
        return redirect('/login')


@app.route("/logout")
def logout():
    session['usuario_logado'] = None
    flash('Logout efetuado com sucesso')
    return redirect("/")
        


if __name__ == "__main__":
    app.run(debug=True)