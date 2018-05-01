export function getRedirectPath({type, avatar}){
	// 根据用户信息 返回跳转地址
	// user.type:用户名类型 /boss /genius
	// user.avatar：用户头像 /bossinfo /geniusinfo
	let url = (type==='boss')?'/boss': '/genius'
	if (!avatar) {
		url += 'info'
	}
	return url
}
