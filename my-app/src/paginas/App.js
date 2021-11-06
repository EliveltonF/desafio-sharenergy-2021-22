import React, { useState } from 'react';
import '../design/App.css';
import { Bar } from 'react-chartjs-2';
import dados from '../dados/dadosUsina.json';


function App() {

  const [valor, setvalor] = useState("");
  const [pos, setpos] = useState("");

  function select(props) {

    switch (props) {
      case 'tensao':
        console.log('tensao')
        setvalor('tensao')
        setpos(dados.map((elem) => ([elem.tensao_V])))
        break;
      case 'corrente':
        console.log('corrente')
        setvalor('corrente')
        setpos(dados.map((elem) => ([elem.corrente_A])))
        break;
      case 'potencia':
        console.log('potencia')
        setvalor('potencia')
        setpos(dados.map((elem) => ([elem.potencia_kW])))
        break;
      case 'temperatura':
        console.log('temperatura')
        setvalor("temperatura")
        setpos(dados.map((elem) => ([elem.temperatura_C])))
        break;


      default:
        break;
    }

  }

  return (

    <div className="App">
      <header className="appBar">

        <ul>
          <li><a href="/">Gráficos</a></li>
          <li><a href="/cliente">Clientes</a></li>
          <li><a href="/lucros">Lucros</a></li>
        </ul>
      </header>
      <main className="main">
        <div className="grafico">

          <Bar
            data={{
              labels: pos,
              datasets: [
                {
                  label: valor + ' por hora ',
                  data: dados.map((elem) => ([elem.tempo_h])),
                  backgroundColor: '#1461bb',
                },
              ]
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    }
                  }
                ]
              }
            }}
          />

        </div>
        <form className="form">
          <div>
            <input className="input" type="radio" id="tensao" name="op" value={valor} onChange={e => select('tensao')} />
            <label className="label" for="tensao">Tensão</label>
            <input className="input" type="radio" id="temperatura" name="op" value={valor} onChange={e => select('temperatura')} />
            <label className="label" for="temperatura">Temperatura</label>
            <input className="input" type="radio" id="potencia" name="op" value={valor} onChange={e => select('potencia')} />
            <label className="label" for="potencia">Potencia</label>
            <input className="input" type="radio" id="corrent" name="op" value={valor} onChange={e => select('corrente')} />
            <label className="label" for="corrent">Corrente</label>
          </div>
        </form>
      </main>
    </div>

  );

}


export default App;
