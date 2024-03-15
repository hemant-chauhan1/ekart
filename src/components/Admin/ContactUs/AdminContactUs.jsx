import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContactUs, getContactUs } from '../../../Store/ActionCreators/ContactUsActionCreators'
import { DataGrid } from '@mui/x-data-grid'


export default function AdminContactUs() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'active', headerName: 'Status', width: 100, renderCell:({row})=> row.active?"Active":"Inactive"},
    { field: 'subject', headerName: 'Subject', width: 150 },
    { field: 'message', headerName: 'Message', width: 150 },
    {
      field: 'show',
      headerName: 'Show',
      sortable: false,
      width: 100,
      renderCell: ({ row }) => <Link to={`/admin/contactus/show/${row.id}`}><i className='fa fa-eye text-primary'></i></Link>
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      renderCell: ({ row }) => {
        if(!(row.active)){
          return <button onClick={() => deleteItem(row.id)} className='btn text-danger'><i className='fa fa-trash'></i></button>
        }
      }
    },
  ];

  let [data, setData] = useState([])
  let dispatch = useDispatch()
  let ContactUsStateData = useSelector((state) => state.ContactUsStateData)

  function deleteItem(id) {
    if (window.confirm("Are you want to delete this item")) {
      dispatch(deleteContactUs({ id: id }))
      getAPIData()
    }
  }

  function getAPIData() {
    dispatch(getContactUs())
    if (ContactUsStateData.length)
      setData(ContactUsStateData)
  }

  useEffect(() => {
    console.log("useEffect")
    getAPIData()
  }, [ContactUsStateData.length])
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">ContactUss</li>
        </ol>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>ContactUs</h5>
            
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </div>

      </div>
    </>
  )
}
