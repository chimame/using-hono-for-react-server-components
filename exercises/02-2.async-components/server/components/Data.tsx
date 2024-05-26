import React from "react"
import type {} from "react/experimental";
import { fetchById } from "../db/data"

type Props = {
  dataId?: number
}

export const Data = async ({ dataId }: Props) => {
  const data = dataId != null ? await fetchById(dataId) : null

  if (!data) {
    return null
  }

  return (
    <div>name: { data.name }</div>
  )
}
