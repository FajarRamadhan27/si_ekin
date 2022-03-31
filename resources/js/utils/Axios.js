import Axios from "axios"
import React from "react"
import SetAuthorizationToken from "./SetAuthorizationToken"

const BASE_URL = 'http://127.0.0.1:8000/'

export function getEmployees(callback) {
    SetAuthorizationToken(localStorage.getItem('jwtToken'))
    Axios.get(`${BASE_URL}api/employee`)
        .then( response => {
            console.log(response.data)
            if (response.status === 200) callback(response.data)
        }).catch(e => console.log(e))
}

export function createEmployee(data, callback, callback2, callback3,callback4) {
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
    Axios.put(`${BASE_URL}api/employee/${id}`, { ...data })
        .then( response => {
            callback(response)
        }).catch(e => console.log(e))
}