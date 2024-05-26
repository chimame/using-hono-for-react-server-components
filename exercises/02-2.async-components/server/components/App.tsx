import React from 'react'
import { Data } from './Data'
import { DataList } from './DataList'

type Props = {
  dataId?: number
}

export function App({ dataId }: Props) {
  return (
    <div style={{display: 'flex'}}>
      <DataList />
      <Data dataId={dataId} />
    </div>
  )
}
