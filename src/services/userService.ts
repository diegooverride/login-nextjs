import User from 'models/user';
import api from 'utils/api'
import Cookie from 'js-cookie'

const UserService = {
  async save(user: User) {
    if(user.id !== '') {
      return await api.put(`/api/User/${user.id}`, user)
    } else {
      return await api.post('/api/User', user)
    }
  },
  async getUser() {
    const user: User = JSON.parse(Cookie.get('userData') as string)
    return await api.get(`/api/User/${user.id}`)
  }

}

export default UserService