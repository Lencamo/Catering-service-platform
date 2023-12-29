// export interface ICardData {
//   title: string
//   heads: {
//     type: string
//     name: string
//     value: string
//     variable: string
//   }[]
//   formData: {
//     [key: string]: any
//   }
// }

export interface IUserData {
  username: string
  password: string
  avatarList?: [
    {
      name: string
      url: string
      [key: string]: any
    }
  ]
  [key: string]: any
}

export interface IStoreData {
  storename: string
  address: string
  logo: {
    name: string
    url: string
    [key: string]: any
  }
  [key: string]: any
}
