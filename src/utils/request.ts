// index.ts
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { showMessage } from "./status";
import { unqualified } from './getApis' // 导入 baseURL

//  定义返回数据类型
type Result<T> = {
  code: number;
  message: string;
  data: T;  // 返回的data数据
  result?: T;// 返回的data数据
  msg?: string;
  count: number;
};

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  // baseConfig: AxiosRequestConfig = { baseURL: "/api", timeout: 6000 }; //"/api" 这种需要配置代理

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    // this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 一般会请求拦截里面加token，用于后端的验证
        const token = localStorage.getItem("token") as string
        if (token) {
          config.headers!.Authorization = token;
        }
        config.headers!['Content-Type'] = 'application/json' // 请求方式
        // console.log('config', config);
        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res;
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示 const { response } = err; //err.response.status
        /*
        let message = showMessage(err.response.status);           // 传入响应码，匹配响应码对应信息
        console.log('错误信息^_^', message, err.response.status);
        // 这里错误消息可以使用全局弹框展示出来
        // 比如element plus 可以使用 ElMessage
        // ElMessage({
        //   showClose: true,
        //   message: `${message}，请检查网络或联系管理员！`,
        //   type: "error",
        // });
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response);
        */
        const { response } = err;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          let msg = showMessage(response.status);           // 传入响应码，匹配响应码对应信息
          console.log('错误信息^_^', msg, response.status);
          // return Promise.reject(response.data);
          return Promise.reject({ msg, status: response.status });
        } else {
          //   ElMessage.warning('网络连接异常,请稍后再试!');
          alert('网络连接异常,请稍后再试!')
        }
      }
    );
  }

  // 定义请求方法:传递配置项的请求方式
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    console.log('走request', config);
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    console.log('走get', url, config);
    return this.instance.get(url, config);//路径、配置：{params：参数}
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    console.log('走新增', url, data, config);
    return this.instance.post(url, data, config);//路径、参数、配置
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    console.log('走修改', url, data, config);
    return this.instance.put(url, data, config);//路径、参数、配置
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    console.log('走删除', url, config);
    return this.instance.delete(url, config);//路径、配置：{data：参数}
  }
  /** 
     * request 的 config 配置项为一个对象
      {
        mathod:'get|post|put|delete ...',//请求方式
        url:""  //  请求地址
        data:{} //  请求参数:POST|DELETE
        params:{} //  将参数放在url地址后面一起发送的列如GET请求
        headers:{}  //    请求头设置
        responseType:'stream'   //服务器响应的类型：arraybuffer|blob|json|text|stream
      }
     * 其他get、post、put、delete 的config 配置项为一个对象 同上      
     */
}

// 默认导出Request实例
export default new Request({})

// 默认导出有两个参数
/**
 * baseConfig: {baseURL: 'http://192.168.1.116:9998/api/NonconformityBasic/nonconformityBasic/v1.1.1/', timeout: 6000} //基础配置
 * instance: ƒ wrap() // 请求方法
*/


/**
 * 
 * switch (err.response.status) {
          case 400:
            message = "请求错误(400)";
            break;
          case 401:
            message = "未授权，请重新登录(401)";
            // 这里可以做清空storage并跳转到登录页的操作
            break;
          case 403:
            message = "拒绝访问(403)";
            break;
          case 404:
            message = "请求出错(404)";
            break;
          case 408:
            message = "请求超时(408)";
            break;
          case 500:
            message = "服务器错误(500)";
            break;
          case 501:
            message = "服务未实现(501)";
            break;
          case 502:
            message = "网络错误(502)";
            break;
          case 503:
            message = "服务不可用(503)";
            break;
          case 504:
            message = "网络超时(504)";
            break;
          case 505:
            message = "HTTP版本不受支持(505)";
            break;
          default:
            message = `连接出错(${err.response.status})!`;
        }
 */