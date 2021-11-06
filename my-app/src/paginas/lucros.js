import '../design/lucros.css';
import dados from '../dados/dadosUsina.json';
import useSWR from "swr";
import { BrowserRouter as Router, Route } from 'react-router-dom';




function lucro() {
   var EnergiaGerada = 0;
   var custoEnergia = 0.95;
   var tempo = dados[1].tempo_h - dados[0].tempo_h;

   dados.map((e) => (EnergiaGerada += e.potencia_kW));
   var lucro = (tempo * EnergiaGerada) * custoEnergia;

   const fetcher = async (url) => {
      const res = await fetch(url);
      const json = await res.json();
      return json;
   }

   const Home = () => {
      const { data } = useSWR("http://localhost:3001/dados", fetcher)
      if (!data) {
         return <p>Loading...</p>
      }
      return(
         <>
            {data.map((e) => (<div className="info-tabela-lucro"><p className="lucro-p">{e.userclientes}</p><p className="lucro-p">  {((e.perctparticipacao / 100) * lucro).toFixed(2)}</p></div>))}
         </>
      )
   }
   return (
      <div className="app-Lucro">
         <header className="appBar-Lucro">
            <ul className="list-Lucro">
               <li className="elemList-Lucro"><a href="/">Graficos</a></li>
               <li className="elemList-Lucro" id="elemListDois"><a href="/cliente">Clientes</a></li>
            </ul>
         </header>
         <main className="main-Lucro">
            <div className="lucro">


               <p className="lucro-p">Lucro do dia:  R$ {lucro.toFixed(2)}</p><br />
               <div className="desc-tabela-lucro"><p className="lucro-p">Nome</p><p className="lucro-p">Lucro R$</p></div>
               {}
               {<Router>
                  <Route path="/" component={Home} />
               </Router>}
            </div>
         </main>
      </div>
   )
}
export default lucro;