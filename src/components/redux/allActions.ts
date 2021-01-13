import * as ITF from '../../constants/Interface'

const setRxLoginInfo = (userObj: ITF.LoginInfo) => {
    return {
        type: "SET_USER",
        payload: userObj
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

const allActions = {
    setRxLoginInfo,
    logOut
}

export default allActions