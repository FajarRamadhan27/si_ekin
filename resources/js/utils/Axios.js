import Axios from "axios"
import SetAuthorizationToken from "./SetAuthorizationToken"

const BASE_URL = 'http://127.0.0.1:8000/'

export function getEmployees(callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/employee`)
        .then( response => {
            if (response.status === 200) {
                callback({ original: response.data, forFilter: response.data})
            }
        }).catch(e => console.log(e))
}

export function getAssessments(callback, period) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/${period}`)
        .then( response => {
            console.log(response);
            if (response.status === 200) {
                callback({ original: response.data, forFilter: response.data})
            }
        }).catch(e => console.log(e))
}

export function getAssessmentsHistory(callback,id,period) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/history/${id}/${period}`)
        .then( response => {
            console.log(response);
            if (response.status === 200) {
                callback({ original: response.data, forFilter: response.data})
            }
        }).catch(e => console.log(e))
}

export function createEmployee(data, callback, callback2, callback3,callback4) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.post(`${BASE_URL}api/employee`, { ...data })
        .then( response => {
            const { status } = response.data
            if (status === true) {
                callback(false)
                callback3(response.data)
                getEmployees(callback2)
                callback4('Data Berhasil disimpan...')
            } else {
                callback3(response.data)
            }
        }).catch(e => console.log(e))
}

export function deleteEmployee(ids, callback, callback2, callback3) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.delete(`${BASE_URL}api/employee`, { params: {ids} })
        .then( response => {
            const { status, messages } = response.data
            if (status === true) {
                getEmployees(callback)
                callback2(messages)
                callback3([])
            } else {
                console.log(response)
            }
        }).catch(e => console.log(e))
}

export function updateEmployee(data, id, callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.put(`${BASE_URL}api/employee/${id}`, { ...data })
        .then( response => {
            callback(response)
        }).catch(e => console.log(e))
}

export function getEmployeeAva(callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/employee/ava`)
        .then( response => {
            if (response.status === 200) {
                callback(response.data)
            }
        }).catch(e => console.log(e))
}

export function getEmployeeDetail(callback, id) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/employee/${id}`)
        .then( response => {
            if (response.status === 200) {
                callback(response.data)
            }
        }).catch(e => console.log(e))
}

export function resetPassword(callback, setModal, setFlashMessage,data) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    const { id }  = JSON.parse(localStorage.getItem('user'))

    Axios.put(`${BASE_URL}api/employee/${id}/changePassword`, { ...data })
        .then( response => {
            const { status } = response.data
            switch (status) {
                case true:
                    setModal(false)
                    setFlashMessage('Password berhasil diperbarui...')
                break;
                case false:
                    callback(response.data)
                break;
            }
        }).catch(e => console.log(e))
}

export function assessmentShowYn(setFlashMessage,data,setAssessments, period) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))

    const { id, ...rest } = data

    Axios.put(`${BASE_URL}api/assessments/${id}/showYn`, { ...rest })
        .then( response => {
            const { status } = response.data
            switch (status) {
                case true:
                    getAssessments(setAssessments,period)
                    setFlashMessage({ type: 'success', message: response.data.message})
                break;
                case false:
                    console.log(response.data)
                break;
            }
        }).catch(e => console.log(e))
}

export function employeeActiveYn(userId, callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))

    Axios.put(`${BASE_URL}api/employee/${userId}/activeYn`)
        .then( response => {
            const { status } = response.data
            switch(status) {
                case true:
                    callback()
                    break;
                default:
                    console.log(response.data)
                    break
            }
        })
        .catch( e => console.log(e))
}
