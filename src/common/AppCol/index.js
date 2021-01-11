import cls from 'classnames'

export default function AppCol({
  className,
  children,
  col_md,
  col_xs,
  col_sm,
  col
}) {
  const classes = cls(className, {
    [`tcl-col-xs-${col_xs}`]: col_xs <= 12 && col_xs >= 1,
    [`tcl-col-md-${col_md}`]: col_md <= 12 && col_md >= 1,
    [`tcl-col-sm-${col_sm}`]: col_sm <= 12 && col_sm >= 1,
    [`tcl-col-${col}`]: col <= 12 && col >= 1
  })
  return (
    <div className={classes}>{children}</div>
  )
}