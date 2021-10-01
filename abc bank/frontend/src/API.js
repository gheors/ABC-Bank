import axios from "axios";

// const BASE_URL = process.env.REACT_APP_ZONE_BACKEND_HOST || "http://localhost:8080/backend/";
const BASE_URL = "http://localhost:8080";

export async function createCandidate(data) {
    return axios.post(BASE_URL + `/candidates`, data);
}

export async function updateCandidate(id, candidate) {
    console.log(candidate)
    return axios.put(BASE_URL + `/candidates/${id}`, candidate);
}


export async function getCandidates() {
    return axios.get(BASE_URL + "/candidates");
}

export async function getProjectById(id) {
    const res = await axios.get(BASE_URL + `/candidates/${id}`);
    return res;
}
export async function getByNameOrLastName(query) {
    const res = await axios.get(BASE_URL + `/candidates/search/${query}`);
    return res;
}

export async function getByRange(min, max) {
    const res = await axios.get(BASE_URL + `/candidates/searchRange/${min}/${max}`);
    return res;
}


export async function deleteCandidate(id) {
    return axios.delete(BASE_URL + `/candidates/${id}`);
}