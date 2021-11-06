import '../design/cadastraCliente.css';
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import useSWR from "swr";


var Name, Idusina, Part, cont = '';



const CadastraCliente = () => {

   const fetcher = async (url) => {
      const res = await fetch(url);
      const json = await res.json();
      return json[0];
   }

   const { data } = useSWR("http://localhost:3001/dadosAltera", fetcher)

   if (data != null) {
      Name = data.userclientes
      Idusina = data.usinaid
      Part = data.perctparticipacao
      cont = 1;
   }
   const handleClick = (values) => { enviarBanco(values); }

   const validationCadastro = yup.object().shape({
      name: yup.string("Sem numeros ou caracteres especiais").required("Campo obrigatório"),
      idusina: yup.number("Sem letras ou caracteres especiais").required("Campo obrigatório"),
      part: yup.number("Sem letras ou caracteres especiais").required("Campo obrigatório"),
   })



   return (
      <div className="App-cadastraCLiente">
         <header>
            <div className="appbar-cadastraCLiente">
               <ul className='lista-cadastraCLiente'>
                  <li className="itens-lista-cadastraCLiente"><a href="/">Gráfico</a></li>
                  <li className="itens-lista-cadastraCLiente"><a href="/cliente">Lista de Clientes</a></li>
               </ul>
            </div>
         </header>
         <main className="Main-cadastraCliente">
            <div className="cadastro">
               <h1 className="h1-cadastraCliente">Cadastro de Novos Clientes</h1>
               {mostra()}
            </div>
         </main>
      </div>
   )
   function enviarBanco(values) {
      if (data.idclientes != null) {
         return (
            Axios.post("http://localhost:3001/registraatt", {
            idclientes: data.idclientes,
            usercliente: values.name,
            usinaid: values.idusina,
            perctParticipacao: values.part,

         }).then((response) => {
            console.log(response)
         }),
         Axios.post("http://localhost:3001/apagaatt").then((response) => {
            console.log(response)
            window.location.href = 'http://localhost:3000/cliente';
         })
         )
      }
   }

   function mostra() {

      if (cont == 1) {
         return (
            <Formik initialValues={{ name: Name, idusina: Idusina, part: Part }} onSubmit={handleClick} validationSchema={validationCadastro}>
               <Form className="cadastro-form">
                  <div className="cadastro-form-group">
                     <Field name="name" className="form-field" placeholder="Nome" />
                     <ErrorMessage component="span" name="name" className="form-error" />
                  </div>
                  <div className="cadastro-form-group">
                     <Field name="idusina" className="form-field" placeholder="ID-Usina" />
                     <ErrorMessage component="span" name="idusina" className="form-error" />
                  </div>
                  <div className="cadastro-form-group">
                     <Field name="part" className="form-field" placeholder="Participaçâo" />
                     <ErrorMessage component="span" name="part" className="form-error" />
                  </div>
                  <a href="/cliente"><button className="button-form" type="submit">Cadastrar</button></a>
               </Form>
            </Formik>
         )
      }
   }

}
export default CadastraCliente;
