import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';


function App() {
  const baseUrl='http://127.0.0.1/billetera-virtual/backend/';
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  //Met Open Modal
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);

  }
  const peticionesGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
      console.log(response.data);
    })
  }
  useEffect(()=>{
    peticionesGet();
  }, [] )
  return (    
    <div class="container">
      <br /><br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()} >Nuevo Cliente</button>
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
          {data.map(clientes=>(
            <tr key={clientes.id}>
              <td>{clientes.id}</td>
              <td>{clientes.documento}</td>
              <td>{clientes.primerNombre}</td>
              <td>{clientes.primerApellido}</td>
              <td>{clientes.email}</td>
              <td>{clientes.celular}</td>
              <td>
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>            
          )
            
          )}
        </tbody>

      </table>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>Registrar Cliente</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Document:</label>
            <br />
            <input type="text" className="form-control" />
            <br />
            <label>Nombre:</label>
            <br />
            <input type="text" className="form-control" />
            <br />
            <label>Apellido:</label>
            <br />
            <input type="text" className="form-control" />
            <br />
            <label>Email:</label>
            <br />
            <input type="text" className="form-control" />
            <br />
            <label>Celular:</label>
            <br />
            <input type="text" className="form-control" />
            <br />
          </div>          
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary">Registrar</button>{""}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()} >Cancelar</button>
        </ModalFooter>
      </Modal>


    </div>
  );
}

export default App;
