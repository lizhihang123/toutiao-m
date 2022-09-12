if (process.env.NODE_ENV !== 'development') {
  console.log = () => {}
  console.dir = () => {}
  console.warning = () => {}
  console.error = () => {}
}
