import React from 'react';
import { FormCheck } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Loader } from 'rsuite';

const CommonTable = (props) => {
  const customStyles = {
    table: {
      font: 'Outfit',
    },
    headRow: {
      style: {
        backgroundColor: '#ff0000',
        color: '#ffffff',
        borderTopStyle: 'solid',
        borderTopWidth: '0px',
        borderTopColor: 'white',
        font: '15px Outfit ',
      },
    },
    headCells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '2px',
          borderRightColor: '#DFDFDF',
          font: '13px Outfit',
        },
      },
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '2px',
          borderRightColor: '#DFDFDF',
          font: '13px Outfit',
          color: '#193256',
        },
      },
    },
  };

  const CustomLoader = () => {
    return  <Loader size="md" content="Medium" />;
  };

  return (
    <div className="container table-responsive rounded-top mt-2  ">
      <DataTable
        columns={props.columns}
        data={props.data}
       
        progressPending={props.loadings}
        progressComponent={<CustomLoader />}
        fixedHeader 
        highlightOnHover={false}
        pointerOnHover
        noDataComponent="Data Not Found"
        customStyles={customStyles}
        onRowClicked={props.onRowClicked}
        responsive={true}
        selectableRowsVisibleOnly
        selectableRowsHighlight
        selectableRowsComponent={FormCheck}
      />
    </div>
  );
};
export default CommonTable;
