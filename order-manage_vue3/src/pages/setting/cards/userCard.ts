import { ref, reactive } from 'vue'
import type { ICardData } from '@/types/main/setting.d.ts'

const userCard = reactive<ICardData>({
  title: '用户信息',
  heads: [
    {
      type: 'text',
      name: '用户名称',
      value: '',
      variable: 'username'
    },
    {
      type: 'password',
      name: '用户密码',
      value: '',
      variable: 'password'
    },
    {
      type: 'image',
      name: '用户头像',
      value: '',
      variable: 'avatar'
    }
  ],
  formData: {
    username: '',
    password: '',
    avatar: {
      name: '',
      url: ''
    }
  }
})

export default userCard
