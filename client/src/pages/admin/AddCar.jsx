import React from 'react'
import AdminLayout from '../../component/AdminLayout'
import CarForm from '../../component/CarForm'
import { useNavigate } from 'react-router-dom'

export default function AddCar() {
  const navigate = useNavigate()

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
          <CarForm onCarAdded={(car) => {
            // navigate back to manage cars after a short delay so admin sees the toast
            setTimeout(() => navigate('/admin/cars'), 500)
          }} />
        </div>
      </div>
    </AdminLayout>
  )
}
