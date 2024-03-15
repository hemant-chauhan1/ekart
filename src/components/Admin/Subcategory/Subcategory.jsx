import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSubcategory, getSubcategory } from '../../../Store/ActionCreators/SubcategoryActionCreators'
import { DataGrid } from '@mui/x-data-grid'


export default function Subcategory() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'name', headerName: 'Name', width: 250 },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 150,
      renderCell: ({ row }) => <Link to={`/admin/subcategory/update/${row.id}`}><i className='fa fa-edit text-primary'></i></Link>
    },
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
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)

  function deleteItem(id) {
    if (window.confirm("Are you want to delete this item")) {
      dispatch(deleteSubcategory({ id: id }))
      getAPIData()
    }
  }

  function getAPIData() {
    dispatch(getSubcategory())
    if (SubcategoryStateData.length)
      setData(SubcategoryStateData)
  }

  useEffect(() => {
    getAPIData()
  }, [SubcategoryStateData.length])
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Subcategory</li>
        </ol>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Subcategory<Link to='/admin/subcategory/create'><i className='fa fa-plus float-end text-light'></i></Link></h5>
            {/* <table className='table table-hover table-bordered'>
              <thead >
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  {/* <th></th>
                  <th></th> */}
            {/* <th colSpan={2} className='text-center'>Actions</th>

                </tr>
              </thead>
              <tbody>
                {
                  data.map((item, index) => {
                    return <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td><Link to={`/admin/subcategory/update/${item.id}`}><i className='fa fa-edit text-primary'></i></Link></td>
                      <td><button onClick={() => deleteItem(item.id)} className='btn text-danger'><i className='fa fa-trash'></i></button></td>
                    </tr>
                  })
                }
              </tbody>
            </table> */}
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
