const SERVER_URL = 'http://222.96.239.85:9184/'; // 정훈 PC
// const SERVER_URL = 'http://127.0.0.1:9184/'; // 로컬호스트
// const SERVER_URL = 'http://15.164.167.216:80/'; // AWS


export default {

  // ***************** 서버 호출
  SERVER_URL: SERVER_URL,
  API_URL: SERVER_URL + 'drpet/',

  IMG_URL: SERVER_URL+'img/',   // 이미지 폴더
  PD_IMG_URL: SERVER_URL+'pd/',   // 상품 이미지 폴더

  // ***************** 어싱크 키
  AS_KEY_LOGIN_INFO: 'as_key_login_info', 


  // ****************** 공통 사용 코드 
  APP_VER: '0.0.1',
  IS_LOG: true
};
