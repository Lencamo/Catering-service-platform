export function getSelectorTop(selector: string, callback: any) {
  const query = uni.createSelectorQuery()
  query.select(selector).boundingClientRect()

  query.exec((res) => {
    callback(res)
  })
}

export function getSelectorAllTop(selector: string, callback: any) {
  const query = uni.createSelectorQuery()
  query.selectAll(selector).boundingClientRect()

  query.exec((res) => {
    callback(res)
  })
}
