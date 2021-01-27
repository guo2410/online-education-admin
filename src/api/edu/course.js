import request from '@/utils/request'

const api_name = '/admin/edu/course'

export default {
    removeById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    updateCourseInfoById(courseInfo) {
        return request({
            url: `${api_name}/update-course-info/${courseInfo.id}`,
            method: 'post',
            data: courseInfo
        })
    },

    getCourseInfoById(id) {
        return request({
            url: `${api_name}/course-info/${id}`,
            method: 'get'
        })
    },
    saveCourseInfo(courseInfo) {
        return request({
            url: `${api_name}/save-course-info`,
            method: 'post',
            data: courseInfo
        })
    }
}