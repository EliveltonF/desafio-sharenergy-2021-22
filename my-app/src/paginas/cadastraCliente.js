import '../design/cadastraCliente.css';
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";



const CadastraCliente = () => {

   const handleKeyDown = (event) => {
      
      if(event.keyCode === 13) { 
          console.log('Enter key pressed')
    }
  }

   const handleClick = (values) => { enviarBanco(values); }

   const validationCadastro = yup.object().shape({
      name: yup.string("Sem numeros ou caracteres especiais").max(12).required("Campo obrigatório"),
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
               <Formik initialValues={{}} onSubmit={handleClick} validationSchema={validationCadastro}>
                  <Form className="cadastro-form" >
                     <div className="cadastro-form-group">
                        <Field name="name" className="form-field" pattern="[a-zA-Záãâéêíîóôõú\s]+$" placeholder="Nome" />
                        <ErrorMessage component="span" name="name" className="form-error" />
                     </div>
                     <div className="cadastro-form-group">
                        <Field name="idusina" className="form-field" placeholder="ID-Usina" />
                        <ErrorMessage component="span" name="idusina" className="form-error" />
                     </div>
                     <div className="cadastro-form-group">
                        <Field onKeyPress={handleKeyDown} name="part" className="form-field" placeholder="Participaçâo" />
                        <ErrorMessage component="span" name="part" className="form-error" />
                     </div>
                     <a href="/"><button className="button-form" type="submit">Cadastrar</button></a>
                  </Form>
               </Formik>
            </div>
         </main>
      </div>
   )
   
   function enviarBanco(values) {
      Axios.post("http://localhost:3001/register", {
         usercliente: values.name,
         usinaid: values.idusina,
         perctParticipacao: values.part,

      }).then((response) => {
         console.log(response)
      })
      window.location.href = 'http://localhost:3000/cliente';
   }

}
export default CadastraCliente;
