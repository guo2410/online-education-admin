import request from '@/utils/request'

const api_name = '/admin/edu/teacher'

export default {
    getList(){
        return request({
            url: `${api_name}`,
            method:'get'
        })
    },
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'post',
            data: searchObj
        })
    },
    removeById(id){
        return request({
            url: `${api_name}/${id}`,
            method: 'delete',
        })
    },
    save(teacher){
        return request({
            url:`${api_name}`,
            method:'post',
            data:teacher
        })
    },
    getById(id){
        return request({
            url:`${api_name}/${id}`,
            method:'get'
        })
    },
    updateById(id,teacher){
        return request({
            url:`${api_name}/${teacher.id}`,
            method:'post',
            data:teacher
        })
    }
}