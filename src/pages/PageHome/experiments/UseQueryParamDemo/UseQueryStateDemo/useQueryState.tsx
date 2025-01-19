import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'

/* ========================================================================
                                useQueryState()
======================================================================== */

export const useQueryState = ({
  key,
  initialValue,
  setOnMount = false
}: {
  key: string
  initialValue: string
  setOnMount?: boolean
}) => {
  const navigate = useNavigate()

  /* ======================
        state & refs
  ====================== */

  const valueRef = useRef(setOnMount ? undefined : initialValue)

  const returnValues = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const paramValue = params.get(key)

    if (paramValue && typeof paramValue === 'string') {
      return paramValue
    }
    return initialValue
  })

  const [internalValue] = returnValues

  /* ======================
         useEffect()
  ====================== */

  useEffect(() => {
    if (valueRef.current === internalValue) {
      return
    }
    valueRef.current = internalValue

    const params = new URLSearchParams(window.location.search)

    if (internalValue === '') {
      params.delete(key)
    } else {
      params.set(key, internalValue.toString())
    }

    navigate(`?${params.toString()}`, { replace: true })
  }, [key, internalValue, navigate])

  return returnValues
}
