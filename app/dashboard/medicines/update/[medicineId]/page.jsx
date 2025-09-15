import UpdateMedicine from '@/components/UpdateMedicine'
import React from 'react'

const UpdateMedicinePage = async({params}) => {
    const {medicineId} = await params
    // console.log(medicineId)
  return (
    <div><UpdateMedicine medicineId={medicineId} /></div>
  )
}

export default UpdateMedicinePage