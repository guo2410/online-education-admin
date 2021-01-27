import request from '@/utils/request'

const api_name = '/admin/edu/chapter'

export default {
    getById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    },
    updateById(chapter) {
        return request({
            url: `${api_name}/${chapter.id}`,
            method: 'put',
            data: chapter
        })
    },
    save(chapter) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: chapter
        })
    },
    removeById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },
    getNestedTreeList(courseId) {
        return request({
            url: `${api_name}/nested-list/${courseId}`,
            method: 'get'
        })
    }
}