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
}

export interface IStoreData {
  storename: string
  storelocal: string
  storephone: string
  storeintro: string
  logoList?: [
    {
      name: string
      url: string
      [key: string]: any
    }
  ]
  [key: string]: any
}
