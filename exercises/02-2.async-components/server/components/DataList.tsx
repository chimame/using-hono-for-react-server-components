import React from "react"
import { fetchAll } from "../db/data"

export const DataList = async () => {
  const list = await fetchAll()

  return (
    <ul>
      {list.map(data => (
        <li key={data.id}><a href={`/${data.id}`}>{data.name}</a></li>
      ))}
    </ul>
  )
}
