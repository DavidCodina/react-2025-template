import { forwardRef, useId } from 'react'

type Ref = HTMLSelectElement

export type ISelect = {
  children?: React.ReactNode
  error?: string // errors?.xxx?.message from react-hook-form
  formGroupClassName?: string
  formGroupStyle?: React.CSSProperties
  formText?: string
  formTextClassName?: string
  formTextStyle?: React.CSSProperties
  label?: string // Could be React.ReactNode, but string is okay for now.
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  size?: 'sm' | 'lg'
  touched?: boolean // touchedFields?.xxx from react-hook-form
} & Omit<React.ComponentProps<'select'>, 'size'>

/* ========================================================================

======================================================================== */

export const Select = forwardRef<Ref, ISelect>(
  (
    {
      children,
      className = '',
      disabled = false,
      error,
      formGroupClassName = '',
      formGroupStyle = {},
      formText = '',
      formTextClassName = '',
      formTextStyle = {},
      id,
      label = '',
      labelClassName = '',
      labelRequired = false,
      labelStyle = {},
      size,
      style = {},
      touched,
      ...otherProps
    },
    ref
  ) => {
    const uuid = useId()
    id = id || uuid

    /* ======================
          getClassName()
    ====================== */

    const getClassName = () => {
      let classes = 'form-select'

      // This  configuration is important. If there is an error, then
      // ALWAYS implement .is-valid. However, if there is no error then ONLY
      // implement .is-valid if touched is true. This makes it so the component
      // can be used without passing in touched and not have an immediate success green.
      // Note also that the component works best when react-hook-form mode is set to 'onTouched'.
      if (error) {
        classes = `${classes} is-invalid`
      } else if (!error && touched) {
        classes = `${classes} is-valid`
      }

      if (size === 'sm') {
        classes = `${classes} form-select-sm`
      } else if (size === 'lg') {
        classes = `${classes} form-select-lg`
      }

      if (className) {
        classes = `${classes} ${className}`
      }

      return classes
    }

    /* ======================
          renderLabel()
    ====================== */

    const renderLabel = () => {
      if (label) {
        return (
          <label
            htmlFor={id}
            className={`form-label${
              labelClassName ? ` ${labelClassName}` : ''
            }`}
            style={{
              ...labelStyle,
              ...(disabled ? { color: 'var(--form-disabled-color)' } : {})
            }}
          >
            {label}{' '}
            {labelRequired && (
              <sup
                className=''
                style={{
                  color: disabled ? 'inherit' : 'red'
                }}
              >
                *
              </sup>
            )}
          </label>
        )
      }
      return null
    }

    /* ======================
        renderFormText()
    ====================== */

    const renderFormText = () => {
      if (formText) {
        return (
          <div
            className={`form-text${
              formTextClassName ? ` ${formTextClassName}` : ''
            }`}
            style={formTextStyle}
          >
            {formText}
          </div>
        )
      }

      return null
    }

    /* ======================
          renderError()
    ====================== */

    const renderError = () => {
      if (error) {
        return <div className='invalid-feedback'>{error}</div>
      }
      return null
    }

    /* ======================
            return
    ====================== */

    return (
      <div className={formGroupClassName} style={formGroupStyle}>
        {renderLabel()}
        <select
          className={getClassName()}
          disabled={disabled}
          id={id}
          ref={ref}
          style={style}
          {...otherProps}
        >
          {children}
        </select>
        {renderFormText()}
        {renderError()}
      </div>
    )
  }
)

Select.displayName = 'Select'
