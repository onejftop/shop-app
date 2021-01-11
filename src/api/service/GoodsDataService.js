import LC from 'leancloud-storage'

class GoodsDataService {

    // 添加新记录，data包含添加的字段及对应的值
    create(data) {
        return new Promise((resolve, reject) => {
            let Goods = LC.Object.extend('Goods');
            let goods = new Goods(data);
            goods.save()
                .then(resp => {
                    console.log('create:', resp);
                    resolve(resp);
                })
                .catch(error => {
                    console.log('create:', error);
                    reject(error)
                });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            let goods = LC.Object.createWithoutData('Goods', id);
            goods.destroy()
                .then(resp => {
                    console.log('delete(id):', resp);
                    resolve(resp)
                })
                .catch(error => {
                    console.log('delete(id):', error);
                    reject(error)
                });
        });
    }


    /**
     * 获取所有数据
     * @returns {Promise<unknown>}
     */
    getAll() {
        return new Promise((resolve, reject) => {
            let query = new LC.Query('Goods');
            // 按 createdAt 降序
            query.descending('createdAt')
                .find()
                .then(resp => {
                    console.log('getAll:', resp);
                    resolve(resp);
                })
                .catch(error => {
                    console.log('getAll:', error);
                    reject(error);
                });
        });
    }

    // 使用id 查询一条记录
    get(id) {
        return new Promise((resolve, reject) => {
            let query = new LC.Query('Goods');
            query.get(id)
                .then(resp => {
                    console.log('get(id):', resp);
                    resolve(resp);
                }).catch(error => {
                console.log('get(id):', error);
                reject(error);
            });
        });
    }


    // 修改记录, data 包含要修改的值
    update(id, data) {
        return new Promise((resolve, reject) => {
            let goods = LC.Object.createWithoutData('Goods', id);
            goods.set(data);
            goods.save()
                .then(resp => {
                    console.log('delete(id):', resp);
                    resolve(resp)
                })
                .catch(error => {
                    console.log('delete(id):', error);
                    reject(error)
                });
        });
    }

}

export default new GoodsDataService();