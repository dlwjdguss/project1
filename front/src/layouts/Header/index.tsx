import {useState,ChangeEvent,KeyboardEvent, useRef, useEffect} from 'react'
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AUTH_PATH,MAIN_PATH, SEARCH_PATH,USER_PATH } from 'constant';
import {useCookies} from 'react-cookie';
import { useLoginUserStore } from 'stores';
import useBoardStore from 'stores/board.store';
import { BOARD_PATH, BOARD_DETAIL_PATH, BOARD_WRITE_PATH, BOARD_UPDATE_PATH } from 'constant';
import { fileUploadRequest, patchBoardRequest, postBoardRequest } from 'apis';
import { PatchBoardRequestDto, PostBoardRequestDto } from 'apis/request/board';
import { PatchBoardResponseDto, PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';

//  component: 헤더
export default function Header() {

  // state : 로그인 유저 상태
  const{loginUser,setLoginUser,resetLoginUser}= useLoginUserStore();
  // state : path 상태
  const{pathname}=useLocation();
  // state : cookie 상태
  const[cookies,setCookie]=useCookies();
  // state : 로그인 상태
  const[isLogin,setLogin]=useState<boolean>(false);
  // state : 인증 페이지 상태
  const[isAuthPage,setAuthPage]=useState<boolean>(false);
  // state : 메인 페이지 상태
  const[isMainPage,setMainPage]=useState<boolean>(false);
  // state : 검색 페이지 상태
  const[isSearchPage,setSearchPage]=useState<boolean>(false);
  // state : 게시물 상세 페이지 상태
  const[isBoardDetailPage,setBoardDetailPage]=useState<boolean>(false);
  // state : 게시물 작성 페이지 상태
  const[isBoardWritePage,setBoardWritePage]=useState<boolean>(false);
  // state : 게시물 수정 페이지 상태
  const[isBoardUpdatePage,setBoardUpdatePage]=useState<boolean>(false);
  // state : 유저 페이지 상태
  const[isUserPage,setUserPage]=useState<boolean>(false);

  
  
  
  //  function:네비게이트 함수
  const navigate=useNavigate();

  //event handler:로고 클릭 이벤트 처리 함수
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH);
  }

  // component: 검색 버튼
  const SearchButton=()=>{

    // state
    const searchButtonRef=useRef<HTMLDivElement | null>(null);
    const[status, setStatus]=useState<boolean>(false);
    const[word,setWord]=useState<string>('');
    const{searchWord}=useParams();
    // event handler: 검색버튼 변경 이벤트 처리
    const onSearchWordChangeHandler=(event: ChangeEvent<HTMLInputElement>)=>{
      const value=event.target.value;
      setWord(value);
    };
    // event handler:검색어 키 이벤트 처리
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key!== 'Enter') return;
      if(!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };
    // event handler: 검색버튼 클릭 이벤트 처리
    const onSearchButtonClickHandler=()=>{
      if(!status){
        setStatus(!status);
      return;
    }
    navigate(SEARCH_PATH(word));
  };
  // effect
  useEffect(()=>{
    if(searchWord)
    {
      setWord(searchWord);
      setStatus(true);
    }
  },[searchWord]);

    // render : 검색버튼 렌더링(클릭 상태)
    if(!status)
    return(
    <div className='icon-button' onClick={onSearchButtonClickHandler}>
      <div className='icon search-light-icon'></div>
      </div>
    );
    return(
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler}/>
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
      </div>
      </div>
    );
  };

  //component: 로그인, 마이페이지 버튼
  const MyPageButton = () =>{

    const{userEmail}=useParams();
    
    //event handler:마이페이지 버튼클릭 이벤트 처리
    const onMyPageButtonClickHandler=()=>{
      if(!loginUser) return;
      const {email} = loginUser;
      navigate(USER_PATH(email));
    };
    //event handler:마이페이지 버튼클릭 이벤트 처리
    const onSignOutButtonClickHandler=()=>{
      resetLoginUser();
      setCookie('accessToken', '', {path:MAIN_PATH, expires: new Date() });
      navigate(MAIN_PATH);
    };

    //event handler: 로그인 버튼 킬릭 이벤트 처리
    const onSignInButtonClickHandler=()=>{
      navigate(AUTH_PATH);
    };

    if(isLogin&&userEmail===loginUser?.email)
    return <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>;
    if(isLogin)
    return<div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;
    return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;
    
        
};
const UploadButton=()=>{

  const{boardNumber}=useParams();
  //state : 게시물 상태
  const{title,content,boardImageFileList,resetBoard}=useBoardStore() ;

  const postBoardResponse=(responseBody: PostBoardResponseDto | ResponseDto | null) =>{
    if(!responseBody)return;
    const{code}=responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code === 'AF' || code === 'NU') navigate(AUTH_PATH);
    if (code === 'VF') alert('제목과 내용은 필수입니다.');
    if (code !== 'SU') return;

    resetBoard();
    if (!loginUser) return;
    const { email } = loginUser;
    navigate(USER_PATH(email));
  }

  const patchBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP') navigate(AUTH_PATH);
    if (code === 'VF') alert('제목과 내용은 필수입니다.');
    if (code !== 'SU') return;

    if (!boardNumber) return;
    navigate(BOARD_PATH() +'/'+ BOARD_DETAIL_PATH(boardNumber));

}

    //event handler: 업로드 버튼 클릭 이벤트 처리
  const onUploadButtonClickHandler= async ()=>{
      const accessToken = cookies.accessToken;
      if(!accessToken){ 
        console.log('토큰 없음');
        return;
      }
      const boardImageList: string[]=[];
      for(const file of boardImageFileList)
      {
        const data = new FormData();
        data.append('file', file);

        const url = await fileUploadRequest(data);
        if (url) boardImageList.push(url);
      }

    const isWriterPage = pathname === BOARD_PATH() +'/' + BOARD_WRITE_PATH();
      if (isWriterPage) {
        const requestBody: PostBoardRequestDto = {
          title, content, boardImageList
        }
        postBoardRequest(requestBody, accessToken).then(postBoardResponse);
      } else {
        if (!boardNumber) return;
        const requestBody: PatchBoardRequestDto = {
           title, content, boardImageList
           }
          patchBoardRequest(boardNumber, requestBody, accessToken).then(patchBoardResponse);
        }
  }
  

    // render:업로드 버튼 컴포넌트 렌더링
    if(title && content)
      return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>;
    // render:업로드 불가 버튼 컴포넌트 렌더링
    return <div className='disable-button' >{'업로드'}</div>;

};

  
  // effect : path 변경
  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH);
    setAuthPage(isAuthPage);
    const isMainPage = pathname === MAIN_PATH;
    setMainPage(isMainPage);
    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setSearchPage(isSearchPage);
    const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
    setBoardDetailPage(isBoardDetailPage);
    const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
    setBoardWritePage(isBoardWritePage);
    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
    setBoardUpdatePage(isBoardUpdatePage);
    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage);
  }, [pathname]);

  useEffect(()=>{
    setLogin(loginUser !==null);
  },[loginUser])

  //  render: 헤더 렌더링
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
            </div>
            <div className='header-logo'>{'Blog'}</div>
            </div>
            <div className='header-right-box'>
              {(isAuthPage || isMainPage ||isSearchPage||isBoardDetailPage)&&<SearchButton/>}
              {!isBoardWritePage && !isBoardUpdatePage &&(isMainPage || isSearchPage||isBoardDetailPage||isUserPage)&&<MyPageButton/>}
              {(isBoardWritePage||isBoardUpdatePage)&&<UploadButton />}
              
            </div>
            </div>
          </div>
   
  )
}

function postBoardResponse(value: ResponseDto | PostBoardRequestDto | null): ResponseDto | PostBoardRequestDto | PromiseLike<ResponseDto | PostBoardRequestDto | null> | null {
  throw new Error('Function not implemented.');
}

