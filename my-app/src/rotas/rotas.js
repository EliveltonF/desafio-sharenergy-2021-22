import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import App from '../paginas/App.js';
import Cliente from '../paginas/cliente.js';
import Lucros from '../paginas/lucros.js';
import Register from '../paginas/cadastraCliente.js';
import Register2 from '../paginas/cadastraCliente2';

function Rotas(){
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/cliente" component={Cliente}/>
            <Route path="/lucros" component={Lucros}/>
            <Route path="/register" component={Register}/>
            <Route path="/registerDois" component={Register2}/>
         </Switch>
      </BrowserRouter>
   )
}
export default Rotas;