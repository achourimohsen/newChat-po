import axios from "axios";
import globalTypes from "./globalTypes";
import { useNavigate } from "react-router-dom";

export const fetchData = () => ({
    type: globalTypes.FETCH_DATA,
});

// export const fetchDataSuccess = (data) => ({
//     type: "FETCH_DATA_SUCCESS",
//     payload: data,
// });

export const getUser = (formData) => async (dispatch) => {
    try {
        const res = await axios.post("http://localhost:3300/api/auth/login", {
            email: formData.email,
            password: formData.password,
        });

        dispatch({
            type: globalTypes.FETCH_DATA_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const fetchDataError = (error) => ({
    type: globalTypes.FETCH_DATA_ERROR,
    payload: error,
});
