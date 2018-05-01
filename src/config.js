import axios from 'axios'
import { Toast } from 'antd-mobile'
//按需引入toast组件的样式
// import 'antd-mobile/lib/toast/style/index.css';

// 拦截请求
axios.interceptors.request.use(function(config){
	Toast.loading('加载中',0)
	return config
})

// 拦截相应

axios.interceptors.response.use(function(config){
	Toast.hide()
	return config
})