import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const data = [
  { n: 1, nombre: "Mannuel", apellido: "Granoble", correo: "mfgranoble@hotmail.com", tipoTelefono: "telefono", numeroTelefono: "865422", direccion: "calle 2a # 11-90" },
  { n: 2, nombre: "Ximena", apellido: "Quijano", correo: "axquijano@hotmail.com", tipoTelefono: "celular", numeroTelefono: "318692355", direccion: "calle 2a # 11-90" },
  { n: 3, nombre: "Santiago", apellido: "Burbano", correo: "santiago@hotmail.com", tipoTelefono: "telefono", numeroTelefono: "9876522", direccion: "calle 2a # 11-90" },
];

const Crud = () => {
  const [contactos, setContactos] = useState({
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      n: "",
      nombre: "",
      apellido: "",
      correo: "",
      tipoTelefono: "telefono",
      numeroTelefono: "",
      direccion: ""
    },
    errors: {
      nombre: "",
      apellido: "",
      correo: "",
      numeroTelefono: "",
      direccion: ""
    }
  });

  const handleChange = (e) => {
    setContactos((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      }
    }));
  };

  const validateForm = () => {
    const { nombre, apellido, correo, numeroTelefono, direccion } = contactos.form;
    let errors = {};
    let valid = true;

    if (!nombre) {
      errors.nombre = "El nombre es obligatorio";
      valid = false;
    }
    if (!apellido) {
      errors.apellido = "El apellido es obligatorio";
      valid = false;
    }
    if (!correo) {
      errors.correo = "El correo es obligatorio";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      errors.correo = "El formato del correo no válido, formato aceptado xxx@xxx.xxx";
      valid = false;
    }
    if (!numeroTelefono) {
      errors.numeroTelefono = "El número de teléfono es obligatorio";
      valid = false;
    } else if (!/^\d+$/.test(numeroTelefono)) {
      errors.numeroTelefono = "El número de teléfono debe ser numérico";
      valid = false;
    }
    if (!direccion) {
      errors.direccion = "La dirección es obligatoria";
      valid = false;
    }

    setContactos(prevState => ({
      ...prevState,
      errors
    }));

    return valid;
  };

  const insertar = () => {
    if (validateForm()) {
      const valorNuevo = { ...contactos.form };
      valorNuevo.n = contactos.data.length + 1;
      const lista = [...contactos.data, valorNuevo];
      setContactos({
        data: lista,
        modalInsertar: false,
        modalActualizar: false,
        form: { n: "", nombre: "", apellido: "", correo: "", tipoTelefono: "telefono", numeroTelefono: "", direccion: "" },
        errors: {}
      });
    }
  };

  const editar = (dato) => {
    if (validateForm()) {
      const arreglo = contactos.data.map((registro) =>
        registro.n === dato.n ? dato : registro
      );
      setContactos({ data: arreglo, modalActualizar: false, form: contactos.form, errors: {} });
    }
  };

  const mostrarModalInsertar = () => {
    setContactos((prevState) => ({
      ...prevState,
      modalInsertar: true,
      form: { n: "", nombre: "", apellido: "", correo: "", tipoTelefono: "telefono", numeroTelefono: "", direccion: "" },
      errors: {}
    }));
  };

  const cerrarModalInsertar = () => {
    setContactos((prevState) => ({
      ...prevState,
      modalInsertar: false,
    }));
  };

  const mostrarModalActualizar = (elemento) => {
    setContactos((prevState) => ({
      ...prevState,
      modalActualizar: true,
      form: elemento,
      errors: {}
    }));
  };

  const cerrarModalActualizar = () => {
    setContactos((prevState) => ({
      ...prevState,
      modalActualizar: false,
    }));
  };

  const eliminar = (dato) => {
    const confirmacion = window.confirm("¿Está seguro de que desea eliminar a " + dato.nombre + " " + dato.apellido + " de tus contactos?");

    if (confirmacion) {
      const nuevaLista = contactos.data.filter((contacto) => contacto.n !== dato.n);
      setContactos({
        data: nuevaLista,
        modalActualizar: false,
        modalInsertar: false,
        form: contactos.form,
        errors: {}
      });
    }
  };

  return (
    <div>
      <Container>
        <br />
        <Button color='success' onClick={mostrarModalInsertar}>Nuevo contacto</Button>
        <br /><br />
        <Table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Tipo de Teléfono</th>
              <th>Número de Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactos.data.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.n}</td>
                <td>{elemento.nombre}</td>
                <td>{elemento.apellido}</td>
                <td>{elemento.correo}</td>
                <td>{elemento.tipoTelefono}</td>
                <td>{elemento.numeroTelefono}</td>
                <td>{elemento.direccion}</td>
                <td>
                  <Button color='primary' onClick={() => mostrarModalActualizar(elemento)}>Editar</Button> {"  "}
                  <Button color='danger' onClick={() => eliminar(elemento)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal para insertar un nuevo contacto */}
      <Modal isOpen={contactos.modalInsertar}>
        <ModalHeader>
          <div><h3>Nuevo contacto</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label> N°: </label>
            <input className="form-control" name='n' readOnly type="text" value={contactos.data.length + 1} />
          </FormGroup>

          <FormGroup>
            <label> Nombres: </label>
            <input className="form-control" name="nombre" type="text" onChange={handleChange} value={contactos.form.nombre} />
            {contactos.errors.nombre && <div className="text-danger">{contactos.errors.nombre}</div>}
          </FormGroup>

          <FormGroup>
            <label> Apellidos: </label>
            <input className="form-control" name="apellido" type="text" onChange={handleChange} value={contactos.form.apellido} />
            {contactos.errors.apellido && <div className="text-danger">{contactos.errors.apellido}</div>}
          </FormGroup>

          <FormGroup>
            <label> Correo: </label>
            <input className="form-control" name="correo" type="text" onChange={handleChange} value={contactos.form.correo} />
            {contactos.errors.correo && <div className="text-danger">{contactos.errors.correo}</div>}
          </FormGroup>

          <FormGroup>
            <label> Tipo de Teléfono: </label>
            <select className="form-control" name="tipoTelefono" onChange={handleChange} value={contactos.form.tipoTelefono}>
              <option value="telefono">Teléfono</option>
              <option value="celular">Celular</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label> Número de Teléfono: </label>
            <input className="form-control" name="numeroTelefono" type="number" onChange={handleChange} value={contactos.form.numeroTelefono} />
            {contactos.errors.numeroTelefono && <div className="text-danger">{contactos.errors.numeroTelefono}</div>}
          </FormGroup>

          <FormGroup>
            <label> Dirección: </label>
            <input className="form-control" name="direccion" type="text" onChange={handleChange} value={contactos.form.direccion} />
            {contactos.errors.direccion && <div className="text-danger">{contactos.errors.direccion}</div>}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={insertar}>Insertar</Button>
          <Button color="danger" onClick={cerrarModalInsertar}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal para actualizar un contacto */}
      <Modal isOpen={contactos.modalActualizar}>
        <ModalHeader>
          <div><h3>Editar contacto</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label> N°: </label>
            <input className="form-control" readOnly type="text" name="n" value={contactos.form.n} />
          </FormGroup>

          <FormGroup>
            <label> Nombres: </label>
            <input className="form-control" name="nombre" type="text" onChange={handleChange} value={contactos.form.nombre} />
            {contactos.errors.nombre && <div className="text-danger">{contactos.errors.nombre}</div>}
          </FormGroup>

          <FormGroup>
            <label> Apellidos: </label>
            <input className="form-control" name="apellido" type="text" onChange={handleChange} value={contactos.form.apellido} />
            {contactos.errors.apellido && <div className="text-danger">{contactos.errors.apellido}</div>}
          </FormGroup>

          <FormGroup>
            <label> Correo: </label>
            <input className="form-control" name="correo" type="text" onChange={handleChange} value={contactos.form.correo} />
            {contactos.errors.correo && <div className="text-danger">{contactos.errors.correo}</div>}
          </FormGroup>

          <FormGroup>
            <label> Tipo de Teléfono: </label>
            <select className="form-control" name="tipoTelefono" onChange={handleChange} value={contactos.form.tipoTelefono}>
              <option value="telefono">Teléfono</option>
              <option value="celular">Celular</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label> Número de Teléfono: </label>
            <input className="form-control" name="numeroTelefono" type="number" onChange={handleChange} value={contactos.form.numeroTelefono} />
            {contactos.errors.numeroTelefono && <div className="text-danger">{contactos.errors.numeroTelefono}</div>}
          </FormGroup>

          <FormGroup>
            <label> Dirección: </label>
            <input className="form-control" name="direccion" type="text" onChange={handleChange} value={contactos.form.direccion} />
            {contactos.errors.direccion && <div className="text-danger">{contactos.errors.direccion}</div>}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => editar(contactos.form)}>Editar</Button>
          <Button color="danger" onClick={cerrarModalActualizar}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Crud;
