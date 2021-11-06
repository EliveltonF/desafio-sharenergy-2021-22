import '../design/cliente.css';
import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import useSWR from "swr";



function Cliente() {

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
      return (<>
         <div className="Desc-Cliente">
            <p className="Desc-p">Nome do Cliente </p>
            <p className="Desc-p">Identificação da Usina </p>
            <p className="Desc-p">Participação na Usina </p>
            <p className="Desc-p" id="muda-Cliente"></p>
            <p className="Desc-p" id="muda-Cliente"></p>
         </div>
         {data.map((items) => (
            <div className="ficha-Cliente">
               <div className="dados-Cliente">
                  <p className="dados-p">{items.userclientes}</p>
                  <p className="dados-p">{items.usinaid}</p>
                  <p className="dados-p">{items.perctparticipacao}</p>
                  <a className="dados-p" id="dados-a"href="/cliente"><button id="dados-button" onClick={function () { apagaDado(items.idclientes) }} className="apagaCliente">Deletar valor</button></a>
                  <a className="dados-p" id="dados-a" href="/registerDois"><button onClick={function(){alterarBanco(items.idclientes)}}id="dados-button-altera">Alterar Dados</button></a>
               </div>
            </div>))}</>)
   }

   return (
      <div className="App-Cliente">
         <header>
            <div className="appbar-Cliente">
               <ul className='lista-Cliente'>
                  <li className="itens-lista-Cliente"><a href="/">Gráfico</a></li>
                  <li className="itens-lista-Cliente"><a href="/register">Registrar</a></li>
               </ul>
            </div>
         </header>
         <main className="Main-Cliente">

           <div className="solucao">
           {<Router>
               <Route path="/" component={Home} />
            </Router>}
           </div>

         </main>
      </div>
   )
   function apagaDado(data) {
      console.log(data)
      Axios.post("http://localhost:3001/apaga", { where: data }).then((response) => {
         console.log("deu erro para apagar os dados", response)
      })
   }
   function alterarBanco(value) {
     Axios.post("http://localhost:3001/altera" , {idclientes: value}).then((response) => {
        console.log("deu algo errado tentando alterar os dados",response)
     })
   }
}

export default Cliente;
