import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getCheckout } from '../../../Store/ActionCreators/CheckoutActionCreators'
import { DataGrid } from '@mui/x-data-grid'


export default function AdminCheckout() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'orderStatus', headerName: 'Order Status', width: 150 },
    { field: 'paymentMode', headerName: 'Payment Mode', width: 120 },
    { field: 'paymentStatus', headerName: 'Payment Status', width: 120 },
    { field: 'subtotal', headerName: 'Subtotal', width: 100, renderCell:({row})=><p>&#8377;{row.subtotal}</p> },
    { field: 'shipping', headerName: 'Shipping', width: 100, renderCell:({row})=><p>&#8377;{row.shipping}</p> },
    { field: 'total', headerName: 'Total', width: 100, renderCell:({row})=><p>&#8377;{row.total}</p> },
    { field: 'date', headerName: 'Date', width: 100, renderCell:({row})=><p>{new Date(row.date).toLocaleDateString()}</p> },
    {
      field: 'show',
      headerName: 'Show',
      sortable: false,
      width: 100,
      renderCell: ({ row }) => <Link to={`/admin/checkout/show/${row.id}`}><i className='fa fa-eye text-primary'></i></Link>
    },
  ];

  let [data, setData] = useState([])
  let dispatch = useDispatch()
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData)

  function getAPIData() {
    dispatch(getCheckout())
    if (CheckoutStateData.length)
      setData(CheckoutStateData)
  }

  useEffect(() => {
    console.log("useEffect")
    getAPIData()
  }, [CheckoutStateData.length])
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Checkouts</li>
        </ol>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Checkout</h5>

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
