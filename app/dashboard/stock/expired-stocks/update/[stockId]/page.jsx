import ExpiredActionsUpdate from '@/components/ExpiredActionsUpdate'
import React from 'react'

const ExpiredActionPage = async ({params}) => {
    const { stockId } =await params
  return (
    <>
    <ExpiredActionsUpdate stockId={stockId}/>
    </>
  )
}

export default ExpiredActionPage