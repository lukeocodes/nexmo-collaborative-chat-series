import Api from '@/services/Api'

export default {
  fetchStatus () {
    return Api().get('server/status')
  }
}
