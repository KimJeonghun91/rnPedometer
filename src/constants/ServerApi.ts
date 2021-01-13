import * as MyUtil from "./MyUtil";
import * as SG from "./Signature";
import Config from "./Config";
import { Alert } from "react-native";

export async function _login(login_corp: string, uniq_key: string, nick: string, profile_img: string, latitude: string, longitude: string): SG.httpReq {
    const REQ_METHODS = "member/login";
    let fcmToken = ""

    try {
        // fcmToken = await messaging().getToken();
        if (fcmToken) {
            MyUtil._consoleLog("******* 로그인 토큰 : " + fcmToken);
        } else {
            // user doesn't have a device token yet
            MyUtil._consoleLog("******* 로그인 토큰 없음");
            fcmToken = "";
        }
    } catch (error) {
        Alert.alert("", "알림이 거부된 상태입니다!\n설정에서 알림을 허용해주세요!");
    }


    const data =
    {
        login_corp, uniq_key, nick, profile_img, latitude, longitude, token: fcmToken
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}
