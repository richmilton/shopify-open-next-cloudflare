'use client'
import { Suspense } from 'react'

export const Search = () =>
  <Suspense>
    <s-search-field
      label="Search"
      onInput={(e) => {console.log(e.currentTarget.value)}}
    >
    </s-search-field>
    <br/>
  </Suspense>
