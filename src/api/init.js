import LC from 'leancloud-storage';
import config from './config/lc.config';

let initOptions;

if (config.url.trim() === '') {
    // url 为空的时候，访问国际版：leancloud.app
    initOptions = {
        appId: config.id,
        appKey: config.key,
    };
} else {
    // url 不为空的时候，访问国内版:leancloud.cn
    initOptions = {
        appId: config.id,
        appKey: config.key,
        serverURLs: config.url,
    };
}

// 执行 leanCloud 初始化
LC.init(initOptions);

export default {}