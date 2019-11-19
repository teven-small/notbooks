import axios from 'axios';
const Qs = require('qs');

//只用于获取地址和端口
axios.defaults.baseURL = 'http://huato.net:8035';
var instance = axios.create({
    // http://huato.net:8035
    baseURL:'http://huato.net:8035'
})

// 登录接口
export const USERLogin = params =>{
    return('/api/RequestOperation/UserLogin?'+Qs.stringify(params))
};
// 首页接口
export const HOME =  params =>{
    return('/api/RequestOperation/HomeDataStatistics?'+Qs.stringify(params))
}
// export const home =  params =>{return instance.get('/api/RequestOperation/HomeDataStatistics?'+Qs.stringify(params))}

// 监测页面-列表展示接口
export const MONITOR = params =>{return('/api/RequestOperation/MonitoringListingData?'+Qs.stringify(params))}

// 监测页面-地图展示接口
export const GETMAP = params =>{return('/api/RequestOperation/MonitoringMapData?'+Qs.stringify(params))}

// 监测页面-图形展示接口
export const GRAPH = params =>{return('/api/RequestOperation/MonitoringGraphData?'+Qs.stringify(params))}

// 单个仪器接口
export const MACHINE = params =>{return('/api/RequestOperation/InstrumentDetailsData?'+Qs.stringify(params))}

// 单个仪器拓展接口(从表数据)
export const EXCEL = params =>{return('/api/RequestOperation/DetailsExtensionInterface?'+Qs.stringify(params))}

// 报警页面
export const WARN = params =>{return('/api/RequestOperation/AlarmDataInterface?'+Qs.stringify(params))}

// 报警措施处理
export const DEAL = params =>{return('/api/RequestOperation/AlarmHandlingOperation?'+Qs.stringify(params))}

// 用户分区
export const AREA = params =>{return('/api/RequestOperation/GetUserGroupData?'+Qs.stringify(params))}

//获取服务器
export const sport = () =>{return instance.get('/api/RequestOperation/GetAddressConfigurationInformationInterface')}
