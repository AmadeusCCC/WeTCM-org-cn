(function() {
  // 1. 安全检查：如果已经在英文/繁体目录，或者当前会话已经跳转过，则直接放行，避免死循环
  if (window.location.pathname.startsWith('/en/') || 
      window.location.pathname.startsWith('/zh-Hant/') ||
      sessionStorage.getItem('lang-routed')) {
    return;
  }

  // 2. 标记当前浏览器会话已执行过路由（这样用户以后如果想手动点右上角切回中文，就不会被强行跳走了）
  sessionStorage.setItem('lang-routed', 'true');

  var userLang = (navigator.language || navigator.userLanguage).toLowerCase();
  var targetPath = null;

  // 3. 匹配繁体中文：台湾、香港、澳门、纯繁体
  if (userLang.includes('zh-tw') || userLang.includes('zh-hk') || userLang.includes('zh-mo') || userLang.includes('zh-hant')) {
    targetPath = '/zh-Hant';
  } 
  // 4. 如果既不是繁体，也不是简体/通用中文，则默认当作海外访客，跳转英文
  else if (!(userLang.includes('zh') || userLang.includes('zh-cn') || userLang.includes('zh-sg') || userLang.includes('zh-my') || userLang.includes('zh-hans'))) {
    targetPath = '/en';
  }
  // (如果是大陆、新马等简体用户，本身就在根目录，targetPath 保持 null，不执行任何跳转)

  // 5. 执行跳转，同时保留用户访问的子路径 (例如访问 /docs/intro 会跳去 /en/docs/intro)
  if (targetPath) {
    var currentPath = window.location.pathname;
    window.location.replace(targetPath + currentPath);
  }
})();