import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import MaterialTable from 'material-table';

const Admin = ({ data, handleValidarHoras }) => {
  return (
    <div>
      <h2>Panel de Administrador</h2>
      <MaterialTable
        title="Horas Trabajadas"
        columns={[
          { title: 'Nombre', field: 'nombre' },
          { title: 'Fecha', field: 'fecha' },
          { title: 'Horas Trabajadas', field: 'horas_trabajadas' },
          { title: 'Horas Extras', field: 'horas_extras' },
          {
            title: 'Acciones',
            field: 'acciones',
            render: rowData => (
              <button onClick={() => handleValidarHoras(rowData.trabajador_id)}>
                Validar
              </button>
            ),
          },
        ]}
        data={data}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default Admin;
