import Footer from 'layouts/Footer';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Main from 'views/Search';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import UserP from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import {MAIN_PATH, AUTH_PATH,SEARCH_PATH,USER_PATH,BOARD_PATH,BOARD_WRITE_PATH,BOARD_DETAIL_PATH,BOARD_UPDATE_PATH} from 'constant';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { GetSignInUserResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { User } from 'types/interface';



// component: Application 컴포넌트 
function App() {

  const{setLoginUser, resetLoginUser}=useLoginUserStore();
   //state: cookie 상태
  const [cookies, setCookie]=useCookies();

  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'AF' || code === 'NU' || code === 'DBE') {
    resetLoginUser();
    return;
    }
  const loginUser: User = { ... responseBody as GetSignInUserResponseDto };
  setLoginUser(loginUser);

  }

  // effect: accessToken cookie
  useEffect(()=>{
    if(!cookies.accessToken){
      resetLoginUser();
      return;
    }

  },[cookies,setCookie]);
  
  // render: Application 컴포넌트 렌더링
  // description : 메인 화면 : '/' Main
  // description : 로그인 + 회원가입 화면 : 'auth' Main
  // description : 메인 화면 : '/' Main
  // description : 메인 화면 : '/' Main
  return (

<Routes>
  <Route element={<Container />}>
    <Route path={MAIN_PATH} element={<Main />} />
    <Route path={AUTH_PATH} element={<Authentication />} />
    <Route path={SEARCH_PATH(':searchWord' )} element={<Search />} />
    <Route path={USER_PATH(':userEmail')} element={<UserP />} />
    <Route path={BOARD_PATH()}>
      <Route path={BOARD_WRITE_PATH()} element ={<BoardWrite />} />
      <Route path={BOARD_DETAIL_PATH(':boardNumber' )} element={<BoardDetail />}/>
      <Route path={BOARD_UPDATE_PATH(':boardNumber' )} element={<BoardUpdate />}/>
      </Route>
<Route path='*' element={<h1>404 Not Found</h1>} />
   </Route>
   </Routes>
  );
}
export default App;
