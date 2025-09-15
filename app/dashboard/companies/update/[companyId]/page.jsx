import UpdateCompany from '@/components/UpdateCompany'
import React from 'react'

const UpdateCompanyPage = async({params}) => {
    const {companyId} = await params
  return (
    <div><UpdateCompany companyId={companyId} /></div>
  )
}

export default UpdateCompanyPage