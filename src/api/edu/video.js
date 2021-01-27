import request from '@/utils/request'

const api_name = '/admin/edu/video'

export default {
    removeById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },

    updateVideoInfoById(videoInfo) {
        return request({
            url: `${api_name}/update-video-info/${videoInfo.id}`,
            method: 'put',
            data: videoInfo
        })
    },

    getVideInfoById(id) {
        return request({
            url: `${api_name}/video-info/${id}`,
            method: 'get'
        })
    },
    saveVideoInfo(videoInfo) {
        return request({
            url: `${api_name}/save-video-info`,
            method: 'post',
            data: videoInfo
        })
    },
}