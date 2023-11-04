import axios from '../utils/request'



export class defectiveItemsTypeService {
  /**
   * @description 不良类类型接口
   * @param {string} params - 类型名称
   * @return {HttpResponse} result
   */
  // 接口一:获取列表
  static async login(params: any) {
    return axios.post<any>('/login/mes-auth-service/mes/api/auth/login', { params, })
  }
 
}

