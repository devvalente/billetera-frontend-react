import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
  import img1_1 from './assets/img/samsung_a70.jpg';
  import img1_2 from './assets/img/samsung_a70_2.jpg';
  import img2_1 from './assets/img/iphone_12.jpg';
  import img2_2 from './assets/img/iphone_12_2.jpg';
  import img3_1 from './assets/img/moto_e.jpg';
  import img3_2 from './assets/img/moto_e_2.jpg';


function App() {
  const ruta = 'http://localhost/billetera-virtual/backend-new/';
  const baseUrl= ruta;
  const [data, setData]=useState([]);
  //Var para actualizar saldo  
  const [saldoActual, setSaldoActual]=useState(0);
  //Para id usuario para enviar pago
  const [clientePago, setClientePago]=useState(0);

  /* -- VENTADANAS MODAL -- */
  const [modalRegistrarCliente, setModalRegistrarCliente]=useState(false);
  const [modalRecargarBilletera, setModalRecargarBilletera]=useState(false);
  const [modalConsultarSaldo, setModalConsultarSaldo]=useState(false);
    //Auxiliar para mostrar saldo
    const [modalMostrarSaldo, setModalMostrarSaldo]=useState(false);
  const [modalCatalogoProductos, setModalCatalogoProductos]=useState(false);
  const [modalConfirmarPago, setModalConfirmarPago]=useState(false);
  const [modalSaldoInsuficiente, setModalSaldoInsuficiente]=useState(false);

  /* -- ACTUALIZAR SALDO */
  const actualizarSaldo=(saldo)=>{
    setSaldoActual(saldo);      
  }

  /* -- ACTUALIZAR ID USUARIO PARA COMPRA --  */
  const actualizarClietePago=(cliente)=>{
    setClientePago(cliente);
  }
  
  /* -- ABRIR - CERRAR VENTANAS MODAL */
    //Abrir-Cerrar Ventana Modal Registrar Cliente
    const abrirCerrarModalRegistrarCliente=()=>{
      setModalRegistrarCliente(!modalRegistrarCliente);
    }
    //Abrir-Cerrar Ventana Modal Recargar Billetera
    const abrirCerrarModalRecargarBilletera=()=>{
      setModalRecargarBilletera(!modalRecargarBilletera);
    }
    //Abrir-Cerrar Ventana Modal Consultar Saldo
    const abrirCerrarModalConstularSaldo=()=>{
      setModalConsultarSaldo(!modalConsultarSaldo);
    }
    //Abrir-Cerrar Ventana Modal Auxiliar Mostrar Saldo
    const abrirCerrarModalMostrarSaldo=()=>{
      setModalMostrarSaldo(!modalMostrarSaldo);
    }
    //Abrir-Cerrar Ventana Modal Catalogo Productos
    const abrirCerrarModalCatalogoProductos=(param, clienteId)=>{
      if(param=="abrir"){
        actualizarClietePago(clienteId);        
      }      
      setModalCatalogoProductos(!modalCatalogoProductos);
    }
    //Abrir-Cerrar Ventana Modal Confirmar Pago
    const abrirCerrarModalConfirmarPago=()=>{
      setModalConfirmarPago(!modalConfirmarPago);
    }
    //Abrir-Cerrar Ventana Modal Saldo Insuficiente
    const abrirCerrarModalSaldoInsuficiente=()=>{
      setModalSaldoInsuficiente(!modalSaldoInsuficiente);
    }
  
  /* -- DECLARACION ATRIBUTOS INPUTS -- */
    //Para atributos de la ventana modal y formulario Registrar Cliente
    const [clienteSeleccionado, setClienteSeleccionado]=useState({
      id:'',
      documento:'',
      primerNombre:'',
      primerApellido:'',
      email:'',
      celular:''
    });
    //Atributos de la ventana modal y formaulario Recargar Billetera
    const [recargarBilletera, setRecargarBilletera]=useState({
      id:'',
      documento:'',
      celular:'',
      valor:''
    });
    //Atributos de la ventana modal y formulario Consultar Saldo
    const [consultarSaldo, setConstularSaldo]=useState({
      id:'',
      documento:'',
      celular:''
    });
    //Atributos para confirmar pago:: token
    const [confirmarPago, setConfirmarPago]=useState({
      id:'',
      token:''
    });


  /* -- CAPTURAR VALORES DE LOS INPUTS AL CAMBIAR -- */
    //Capturar lo que se ingresa en los inputs
    const handleChange=(e)=>{
      const {name, value}=e.target;      
        setClienteSeleccionado((prevState)=>({
          ...prevState,
          [name]:value
        }))
        console.log(clienteSeleccionado);        
    }
    //Capturar lo que se ingresa:: Recargar Billetera
    const changeRecargarBilletera=(e)=>{
      const {name, value}=e.target;
      setRecargarBilletera((prevState)=>({
        ...prevState,
        [name]:value
      }))
      console.log(recargarBilletera);
    }
    //Capturar lo que se ingresa:: Consultar Saldo
    const changeConsultarSaldo=(e)=>{
      const {name, value}=e.target;
      setConstularSaldo((prevState)=>({
        ...prevState,
        [name]:value
      }))
      console.log(consultarSaldo);
    }
    //Capturar lo que se ingresa::Confirmar Pago
    const changeConfirmarPago=(e)=>{
      const {name, value}=e.target;
      setConfirmarPago((prevState)=>({
        ...prevState,
        [name]:value
      }))
    }

  /* -- PETICIONES GET -- */
    //Para peticion get
    const peticionesGet=async()=>{
      await axios.get(baseUrl)
      .then(response=>{
        setData(response.data);
        console.log(response.data);
      })
    }


  /* -- PETICIONES POST -- */
    //Post::RegistrarCliente
    const peticionesPost=async()=>{
      //FormData a enviar
      var formData = new FormData();
      formData.append("accion", "registrar_cliente");
      formData.append("documento", clienteSeleccionado.documento);
      formData.append("primerNombre", clienteSeleccionado.primerNombre);
      formData.append("primerApellido", clienteSeleccionado.primerApellido);
      formData.append("email", clienteSeleccionado.email);
      formData.append("celular", clienteSeleccionado.celular);
      await axios.post(baseUrl, formData)
      .then(response=>{
        setData(data.concat(response.data));
        peticionesGet();
        abrirCerrarModalRegistrarCliente();
      })
    };
    //Post::RecargarBilletera
    const postRecargarBilletera=async()=>{
      //FormData a enviar
      var formData = new FormData();
      formData.append("accion", "recargar_billetera");
      formData.append("documento", recargarBilletera.documento);
      formData.append("celular", recargarBilletera.celular);
      formData.append("valor", recargarBilletera.valor);      
      await axios.post(baseUrl, formData)
      .then(response=>{        
        if(response.data.respuesta == 'Ok'){
          abrirCerrarModalRecargarBilletera();  
          postConsultarSaldo(recargarBilletera.documento, recargarBilletera.celular);
        }
        setData(data.concat(response.data));        
      })
    };
    //Post::Consultar Saldo
    const postConsultarSaldo=async(documento, celular)=>{
      //FormData a enviar
      var formData = new FormData();
      formData.append("accion", "consultar_saldo");
        if(!documento){
          formData.append("documento", consultarSaldo.documento);        
        }else{
          formData.append("documento", documento);        
        }
        if(!celular){
          formData.append("celular", consultarSaldo.celular);          
        }else{
          formData.append("celular", celular);      
        }
      
      
      await axios.post(baseUrl, formData)
      .then(response=>{        
        if(!documento){
          //Cerrar ventana modal actual
          abrirCerrarModalConstularSaldo();  
        }        
        //Abrir ventana modal con saldo  
        actualizarSaldo(response.data.saldo);
        console.log(response.data.saldo);
        abrirCerrarModalMostrarSaldo();
        setData(data.concat(response.data));        
        peticionesGet();
        
      })
    };
    //Post:Pagar un producto
    const postPagarProducto=async(param0, param1, param2)=>{
      //FormData a enviar
      var formData = new FormData();
      formData.append("accion", "pagar");
      formData.append("cliente", param0);
      formData.append("monto", param1);      
      formData.append("iva", param2);      
      await axios.post(baseUrl, formData)
      .then(response=>{        
        //Cerrar ventana modal actual
        
        //Abrir ventana modal de confirmación
        console.log("Pagar:;");
        console.log(response.data);
        if(response.data.estatus == 'Ok'){
          abrirCerrarModalConfirmarPago();  
        }else{
          abrirCerrarModalSaldoInsuficiente();
        }
        
      })
    };
    //Post:Confirmar Pago
    const postConfirmarPago=async()=>{
      //FormData a enviar
      var formData = new FormData();
      formData.append("accion", "confirmar_pago");
      formData.append("cliente", clientePago);
      formData.append("token", confirmarPago.token);
      await axios.post(baseUrl, formData)
      .then(response=>{
        //Cerrar ventana de confirmación
        abrirCerrarModalConfirmarPago();
        //Si respuesta es ok
        if(response.data.status=='Ok'){
          //Mostrar mensaje de que se ha pagado
          alert("Se ha realizado la compra con éxito"); 
          //Cerrar catalogo
          abrirCerrarModalCatalogoProductos(); 
        }else{
          alert("No se realizó la compra.")
        }
        
        
        
      })
    }
      
  useEffect(()=>{
    peticionesGet();
  }, [] )
  return (    
    <div className="container">
      <br /><br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalRegistrarCliente()}  >Nuevo Cliente       </button>
      <button className="btn btn-success" onClick={()=>abrirCerrarModalRecargarBilletera()} >Recargar Billeterea </button>
      <button className="btn btn-success" onClick={()=>abrirCerrarModalConstularSaldo()}    >Consultar Saldo     </button>
      <br /><br />
      <h3>Lista de Clientes</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((cliente, i)=>{
              return(
                <tr key={i}>
                  <td>{cliente.id}</td>
                  <td>{cliente.documento}</td>
                  <td>{cliente.primerNombre}</td>
                  <td>{cliente.primerApellido}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.celular}</td>
                  <td>
                    
                    <button className="btn btn-menu btn-success" onClick={()=>abrirCerrarModalCatalogoProductos("abrir", cliente.id)} > Pagar    </button>
                  </td>
                </tr>    
              );
              })
          }
          
        </tbody>

      </table>

      { /*Modal para Registrar Cliente */ }
      <Modal isOpen={modalRegistrarCliente}>
        <ModalHeader className="btn-primary">Registrar Cliente</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Document:</label>
            <br />
            <input type="text" className="form-control" name="documento" onChange={handleChange} />
            <br />
            <label>Nombre:</label>
            <br />
            <input type="text" className="form-control" name="primerNombre" onChange={handleChange} />
            <br />
            <label>Apellido:</label>
            <br />
            <input type="text" className="form-control" name="primerApellido" onChange={handleChange} />
            <br />
            <label>Email:</label>
            <br />
            <input type="text" className="form-control" name="email" onChange={handleChange} />
            <br />
            <label>Celular:</label>
            <br />
            <input type="text" className="form-control" name="celular" onChange={handleChange} />
            <br />
          </div>          
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionesPost()} >Registrar</button>{""}
          <button className="btn btn-danger"  onClick={()=>abrirCerrarModalRegistrarCliente()} >Cancelar</button>
        </ModalFooter>
      </Modal>
      { /* --Fin Modal-- */ }

      { /* Modal para Recargar Billetera */ }
      <Modal isOpen={modalRecargarBilletera}>
        <ModalHeader className="btn-success">
          <div>Recargar Billetera</div>
        </ModalHeader>
        <ModalBody>        
          <div className="form-group">
            <label>Documento:</label>
            <br />
            <input type="text" className="form-control" name="documento" onChange={changeRecargarBilletera} />
            <br />
            <label>Celular:</label>
            <br />
            <input type="text" className="form-control" name="celular" onChange={changeRecargarBilletera} />
            <br />
            <label>Valor:</label>
            <br />
            <input type="text" className="form-control" name="valor" onChange={changeRecargarBilletera} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>   
          <button className="btn btn-primary" onClick={()=>postRecargarBilletera()} >Recargar</button>{""}
          <button className="btn btn-danger"  onClick={()=>abrirCerrarModalRecargarBilletera()} >Cancelar</button>       
        </ModalFooter>
      </Modal>
      { /* --Fin Modal-- */ }

      { /* Modal para Consultar Saldo */ }
      <Modal isOpen={modalConsultarSaldo} >
        <ModalHeader className="btn-primary">
          <div>Consultar Saldo</div>
        </ModalHeader>
        <ModalBody>        
          <div className="form-group">
            <label>Documento:</label>
            <br />
            <input type="text" className="form-control" name="documento" onChange={changeConsultarSaldo} />
            <br />
            <label>Celular:</label>
            <br />
            <input type="text" className="form-control" name="celular" onChange={changeConsultarSaldo} />
            <br />            
          </div>
        </ModalBody>
        <ModalFooter>   
          <button className="btn btn-primary" onClick={()=>postConsultarSaldo()} >Consultar</button>{""}
          <button className="btn btn-danger"  onClick={()=>abrirCerrarModalConstularSaldo()} >Cancelar</button>       
        </ModalFooter>
      </Modal>
      { /* --Fin Modal-- */ }

      { /* Modal que muestra el saldo consultado */ }
      <Modal isOpen={modalMostrarSaldo} >
        <ModalHeader className="btn-primary">
          <div>Saldo Actual</div>
        </ModalHeader>
        <ModalBody>        
          <div className="form-group">
            <label>Su saldo actual es:</label>
            <br />
            <label>Saldo: {saldoActual}$ </label>
            <br />            
          </div>
        </ModalBody>
        <ModalFooter>             
          <button className="btn btn-primary" onClick={function(event){abrirCerrarModalMostrarSaldo(); abrirCerrarModalRecargarBilletera()}}> Recargar Saldo </button>
          <button className="btn btn-success" onClick={()=>abrirCerrarModalMostrarSaldo()} >Ok</button>       
        </ModalFooter>
      </Modal>
      { /* --Fin Modal-- */ }

      { /* Modal que muestra catálogo de productos */ }
      <Modal className="modal-productos" isOpen={modalCatalogoProductos} >
        <ModalHeader className="btn-primary">
          <div>Catálogo de productos</div>
        </ModalHeader>
        <ModalBody className="modal-productos-body">        
          <div className="container">
            { /*Producto 1*/ }
            <div className="contenedor-producto">
              <div className="contenedor-imagen">
                <img className="img_catalago" id="img1_1" src={img1_1} width="200" />
                <img className="img_catalago" id="img1_2" src={img1_2} width="200" />
              </div>
              <div className="div-reset"></div>
              <div>
                <div className="div-detalles-producto" ><strong>Producto: Samsung A 70</strong></div>
                <div className="div-detalles-producto div-detalles-costo">Precio: 425.00$ + Iva: 63.75$</div>                
                <div className="div-detalles-producto" >Total: 488.75$ </div>                
                <div><button className="btn btn-success btn-comprar" onClick={()=>postPagarProducto(clientePago,425,15)}>Comprar</button></div>
              </div>
            </div>
            { /*Producto 1*/ }
            <div className="contenedor-producto">
              <div className="contenedor-imagen">
                <img className="img_catalago" id="img1_1" src={img2_1} width="200" />
                <img className="img_catalago" id="img1_2" src={img2_2} width="200" />
              </div>
              <div className="div-reset"></div>
              <div>
                <div className="div-detalles-producto" ><strong>Producto: iPhone 12</strong></div>
                <div className="div-detalles-producto div-detalles-costo">Precio: 920.00$ + Iva: 138.00$</div>                
                <div className="div-detalles-producto" >Total: 1058.00$ </div>                
                <div><button className="btn btn-success btn-comprar" onClick={()=>postPagarProducto(clientePago,920,15)}>Comprar</button></div>
              </div>
            </div>
            { /*Producto 1*/ }
            <div className="contenedor-producto">
              <div className="contenedor-imagen">
                <img className="img_catalago" id="img1_1" src={img3_1} width="200" />
                <img className="img_catalago" id="img1_2" src={img3_2} width="200" />
              </div>
              <div className="div-reset"></div>
              <div>
                <div className="div-detalles-producto" ><strong>Moto E 2020</strong></div>
                <div className="div-detalles-producto div-detalles-costo">Precio: 895.00$ + Iva: 134.25$</div>                
                <div className="div-detalles-producto" >Total: 1029.25$ </div>                
                <div><button className="btn btn-success btn-comprar" onClick={()=>postPagarProducto(clientePago,895,15)}>Comprar</button></div>
              </div>
            </div>

          </div>
        </ModalBody>
        <ModalFooter className="btn-primary">                       
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalCatalogoProductos("", 0)} >Cerrar</button>       
        </ModalFooter>
      </Modal>
      { /* -- Fin Modal Catalogo Productos -- */ }

      { /* Modal para Confirmar Pago */ }
      <Modal isOpen={modalConfirmarPago} >
        <ModalHeader className="btn-primary">
          <div>Confirmar Pago</div>
        </ModalHeader>
        <ModalBody>   
          <div>Se ha enviado a su correo registrado en ésta plataforma un código de confirmación de 06 dígitos.
          Por favor ingréselo para confirmar su pago.</div>     
          <div className="form-group">
            <label>Token:</label>
            <br />
            <input type="text" className="form-control" name="token" onChange={changeConfirmarPago} />            
            <br />            
          </div>
        </ModalBody>
        <ModalFooter>   
          <button className="btn btn-primary" onClick={()=>postConfirmarPago()} >Confirmar</button>{""}
          <button className="btn btn-danger"  onClick={()=>abrirCerrarModalConfirmarPago()} >Cancelar</button>       
        </ModalFooter>
      </Modal>
      { /* --Fin Modal-- */ }

    { /* Modal Saldo Insuficiente */ }
      <Modal isOpen={modalSaldoInsuficiente} >
        <ModalHeader className="btn-primary">
          <div>Saldo Insuficiente</div>
        </ModalHeader>
        <ModalBody>   
          <div>No tiene saldo suficiente para realizar la compra.</div>               
        </ModalBody>
        <ModalFooter>             
          <button className="btn btn-danger"  onClick={()=>abrirCerrarModalSaldoInsuficiente()} >Cancelar</button>       
        </ModalFooter>
      </Modal>
      { /* --Fin Modal-- */ }

    </div>
  );
}

export default App;
