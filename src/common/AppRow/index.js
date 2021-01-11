import cls from 'classnames';

export default function AppRow({ children, className }) {
  const classes = cls('tcl-row', {
    [className]: className
  })
  return (
    <div className={classes}>{children}</div>
  )
}