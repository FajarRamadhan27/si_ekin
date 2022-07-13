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

export function getUserAssessmentByPeriod(callback,userId,period) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/getUserAssessmentByPeriod/${userId}/${period}`)
        .then( response => {
            console.log(response);
            if (response.status === 200) {
                if (response.data.length < 1) {
                    callback({ approve_yn: null, karakter: null, absensi: null, teamwork: null, pencapaian: null, loyalitas: null, efisiensi: null})
                } else {
                    callback(response.data[0])
                }
            }
        }).catch(e => console.log(e))
}

export function getKpiIndex(callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/kpi/getKpiIndex`)
        .then( response => {
            if (response.status === 200) {
                    callback(response.data)
            }
        }).catch(e => console.log(e))
}

export function getKpiNormalization(callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/kpi/getKpiNormalization`)
        .then( response => {
            if (response.status === 200) {
                    callback(response.data)
            }
        }).catch(e => console.log(e))
}

export function getKpiRowSummary(callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/kpi/getKpiRowSummary`)
        .then( response => {
            if (response.status === 200) {
                    callback(response.data)
            }
        }).catch(e => console.log(e))
}

export function getkpiCosistencyRatio(callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/kpi/getkpiCosistencyRatio`)
        .then( response => {
            if (response.status === 200) {
                    callback(response.data)
            }
        }).catch(e => console.log(e))
}

export function getAssessments(callback, period, userId) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/${period}`, { params: { id: userId }})
        .then( response => {
            if (response.status === 200) {
                callback({ original: response.data, forFilter: response.data})
            }
        }).catch(e => console.log(e))
}

export function getApproval(callback, period) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/approval/${period}`)
        .then( response => {
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

export function getEmployeeRank(callback, period) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/assessments/rank/${period}`)
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

export function bulkShowAssessments(ids, callback, callback2, callback3, period) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.put(`${BASE_URL}api/assessments/bulkShowYn`, {ids})
        .then( response => {
            const { status, message } = response.data
            if (status === true) {
                getAssessments(callback, period)
                callback2({type: 'success', message})
                callback3([])
            } else {
                console.log(response)
            }
        }).catch(e => console.log(e))
}

export function bulkApproveAssessments(ids, callback, callback2, callback3, period) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.put(`${BASE_URL}api/assessments/bulkApprove`, {ids})
        .then( response => {
            const { status, message } = response.data
            if (status === true) {
                getApproval(callback, period)
                callback2({type: 'success', message})
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

export function approveYn(setFlashMessage,data,setAssessments, period) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))

    const { id, ...rest } = data

    Axios.put(`${BASE_URL}api/assessments/${id}/approveYn`, { ...rest })
        .then( response => {
            const { status } = response.data
            switch (status) {
                case true:
                    getApproval(setAssessments,period)
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

export function getTotalEmployee(callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))

    Axios.get(`${BASE_URL}api/employee/getTotalEmployee`)
        .then(response => {
            const { TOTAL_EMPLOYEE } = response.data[0]
            callback(TOTAL_EMPLOYEE)
        })
}

export function findUser(key, callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))

    Axios.get(`${BASE_URL}api/employee/findUser/${key}`)
        .then(response => {
            callback(response.data)
        })
}

export function deleteAssessment(callback, callback2, employeId, period, id) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))

    Axios.delete(`${BASE_URL}api/assessments/${id}`)
        .then( response => {
            const { status, message } = response.data
            if (status) {
                callback({ type: 'success', message })
                getUserAssessmentByPeriod(callback2, employeId, period)
            } else {
                callback({ type: 'warning', message: 'Warning' })
            }
        }).catch(e => console.log(e))
}

export function createOrEditAssessment(callback, callback2, employeeId, period, data) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))

    Axios.put(`${BASE_URL}api/assessments`, {...data, period, user_id: employeeId})
        .then(response => {
            const { status, message } = response.data
            if (status) {
                callback({ type: 'success', message })
                getUserAssessmentByPeriod(callback2, employeId, period)
            } else {
                callback({ type: 'warning', message: 'Warning' })
            }
        }).catch(e => console.log(e))
}
