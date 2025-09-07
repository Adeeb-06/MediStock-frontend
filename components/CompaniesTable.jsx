"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CompaniesTable = () => {
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/company/all-companies`)
            .then(res => {
                console.log(res.data);
                setCompanies(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
  return (
    <div>CompaniesTable</div>
  )
}

export default CompaniesTable