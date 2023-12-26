import { ref, reactive } from 'vue'
import type { ICardData } from '@/types/main/setting.d.ts'

const storeCard = reactive<ICardData>({
  title: '店铺信息',
  heads: [
    {
      type: 'text',
      name: '店铺名称',
      value: '仙之源饭店',
      variable: 'storename'
    },
    {
      type: 'text',
      name: '店铺地址',
      value: '上海市黄浦区南京东路123号',
      variable: 'address'
    },
    {
      type: 'image',
      name: '店铺Login',
      value: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      variable: 'logo_url'
    }
  ],
  formData: {
    storename: '仙之源饭店',
    address: '上海市黄浦区南京东路123号',
    logo: {
      name: 'file',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
})

export default storeCard
