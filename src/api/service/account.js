import LC from 'leancloud-storage';


/**
 * @description: 注册新用户
 * @param {*} username
 * @param {*} password
 * @param {*} email 可选参数
 * @return {*}
 */
let signUp = (username, password) => {
    let user = new LC.User();
    user.setUsername(username);
    user.setPassword(password);

    return new Promise((resolve, reject) => {
        // 当异步代码执行成功时，会调用resolve(...), 当异步代码失败时就会调用reject(...)
        // promise.then(onFulfilled).catch(onRejected)
        // then() 用于进行成功之后的操作； catch()用于处理失败之后的操作
        user.signUp().then(user => {
            console.log(`注册成功， objectId:${user.id}`);
            resolve(user);
        }, error => {
            console.log('注册失败');
            reject(error);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
};



/**
 * @description: 用户登录
 * @param {*} username
 * @param {*} password
 * @return {*}
 */
let login = (username, password) => {
    return new Promise((resolve, reject) => {
        LC.User.logIn(username, password).then(user => {
            console.log(user);
            resolve(user);
        }, (err) => {
            console.log(err);
            reject(err);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
};


/**
 * @description: 注销
 * @param {*}
 * @return {*}
 */
let logout = () => {
    return new Promise((resolve, reject) => {
        LC.User.logOut().then(resp => {
            resolve(resp);
        }, err => {
            reject(err);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
};

/**
 * @description: 判断是否有已登录的用户
 * @param {*}
 * @return {*}  : 用户已登录时，返回当前用户信息；否则返回false
 */
let isLoggedIn = () => {
    let currentUser = LC.User.current(); // 获取当前用户
    if (currentUser) {
        return currentUser;    // 已有登录用户，返回当前用户
    }
    return false;     // 没有用户登录，返回false
};


export default {
    signUp,
    login,
    logout,
    isLoggedIn,
};