// sắp xếp bảng, cột công việc
const mapOrder = (array, order, key) => {
  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
  return array
}
export {mapOrder}