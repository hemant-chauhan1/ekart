import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNewsletter, getNewsletter } from '../../../Store/ActionCreators/NewsletterActionCreators'
import { DataGrid } from '@mui/x-data-grid'


export default function Newsletter() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'email', headerName: 'Email', width: 300 },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 150,
      renderCell: ({ row }) => <button onClick={() => deleteItem(row.id)} className='btn text-danger'><i className='fa fa-trash'></i></button>
    },
  ];

  let [data, setData] = useState([])
  let dispatch = useDispatch()
  let NewsletterStateData = useSelector((state) => state.NewsletterStateData)

  function deleteItem(id) {
    if (window.confirm("Are you want to delete this item")) {
      dispatch(deleteNewsletter({ id: id }))
      getAPIData()
    }
  }

  function getAPIData() {
    dispatch(getNewsletter())
    if (NewsletterStateData.length)
      setData(NewsletterStateData)
  }

  useEffect(() => {
    console.log("useEffect")
    getAPIData()
  }, [NewsletterStateData.length])
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Newsletters</li>
        </ol>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Newsletter</h5>
            
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
