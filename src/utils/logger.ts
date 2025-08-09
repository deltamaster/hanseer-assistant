export function logUserInfo(userInfo: any) {
  console.log('User logged in:', {
    name: userInfo.name,
    email: userInfo.username,
    accountId: userInfo.localAccountId,
    timestamp: new Date().toISOString()
  })
}
