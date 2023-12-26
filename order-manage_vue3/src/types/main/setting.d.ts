export interface ICardData {
  title: string
  heads: {
    type: string
    name: string
    value: string
    variable: string
  }[]
  formData: {
    [key: string]: any
  }
}
