import type { ICardData } from '@/types/main/setting.d.ts'

export function dataToCard(card: ICardData, data: any) {
  // 显示的数据
  Object.keys(data).forEach((key) => {
    card.heads.forEach((item, index) => {
      if (item.variable === 'password') {
        item.value = '*'.repeat(data.password.length)
      }
      if (item.variable === 'avatar') {
        item.value = data.avatar.url
      }
      if (item.variable === key) {
        item.value = data[key]
      }
    })
  })

  // 弹窗的数据
  card.formData = data
}
