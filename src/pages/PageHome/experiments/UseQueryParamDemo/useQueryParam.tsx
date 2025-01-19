import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

/* ========================================================================
                                useQueryParam()
======================================================================== */

export const useQueryParam = ({
  key,
  value,
  setOnMount = false
}: {
  key: string
  value: string
  setOnMount?: boolean
}) => {
  const navigate = useNavigate()
  const valueRef = useRef(setOnMount ? undefined : value)

  /* ======================
         useEffect()
  ====================== */

  useEffect(() => {
    if (valueRef.current === value) {
      return
    }
    valueRef.current = value

    const params = new URLSearchParams(window.location.search)

    if (value === '') {
      params.delete(key)
    } else {
      params.set(key, value.toString())
    }

    navigate(`?${params.toString()}`, { replace: true })
  }, [key, value, navigate])
}
