import axios from 'axios';
import { SignInRequestDto,SignUpRequestDto } from './request/auth';
import { ResponseDto } from './response';
import { SignInResponseDto, SignUpResponseDto } from './response/auth';
import GetSignInUserResponseDto from './response/user/get-sign-in-user.response.dto';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './request/board';
import { PostBoardResponseDto,GetBoardResponseDto, IncreaseViewCountResponseDto, GetCommentListResponseDto, PutFavoriteResponseDto, PostCommentResponseDto, DeleteBoardResponseDto, PatchBoardResponseDto, GetLatestBoardListResponseDto, GetSearchBoardListResponseDto, GetUserBoardListResponseDto } from './response/board';
import GetFavoriteListResponseDto from './response/board/get-favorite-list.response.dto';
import { GetPopularListResponseDto, GetRelationListResponseDto } from './response/search';
import { GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from './response/user';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from './request/user';

const DOMAIN = 'http://localhost:4000';

const authorization=(accessToken: string)=>{
    
        return{headers: {Authorization: `Bearer ${accessToken}`}}
    };


const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async(requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
    .then(response => {
        console.log('axios success:', response);
        return response.data as SignInResponseDto;
    })
    .catch(error => {
        if (!error.response) return null;
        console.log('axios error:', error);
        console.log('axios error response:', error.response);
        return error.response.data as ResponseDto;
    })
return result;
    
        
};

export const signUpRequest = async(requestBody: SignInRequestDto) => {
    const result = await axios. post(SIGN_UP_URL(), requestBody)
        .then(response => {
        const responseBody: SignUpResponseDto = response.data;
        return responseBody;
        })
        .catch(error => {
        if (!error.response.data) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
        });
        return result;
}

const GET_BOARD_URL = (boardNumber: number|string) => `${API_DOMAIN}/board/${boardNumber}`;
const GET_LATEST_BOARD_LIST_URL =()=>`${API_DOMAIN}/board/latest-list`;
const GET_TOP_3_BOARD_LIST_URL=()=>`${API_DOMAIN}/board/top-3`;
const GET_SEARCH_BOARD_LIST_URL=(searchWord:string, preSearchWord:string|null)=>`${API_DOMAIN}/board/search-list/${searchWord}${preSearchWord?'/'+preSearchWord:''}`;
const GET_USER_BOARD_LIST_URL=(email: string)=>`${API_DOMAIN}/board/user-board-list/${email}`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_URL=(boardNumber: number|string) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
const GET_COMMENT_LIST_URL =(boardNumber: number|string) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const POST_COMMENT_URL = (boardNumber: number|string) => `${API_DOMAIN}/board/${boardNumber}/comment`;
const PATCH_BOARD_URL = (boardNumber: number|string) => `${API_DOMAIN}/board/${boardNumber}`;
const PUT_FAVORITE_URL = (boardNumber: number|string) => `${API_DOMAIN}/board/${boardNumber}/favorite`;
const DELETE_BOARD_URL = (boardNumber: number|string) => `${API_DOMAIN}/board/${boardNumber}`; 

export const getBoardRequest =async (boardNumber: number | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
        .then(response => {
            const responseBody: GetBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getSearchBoardListRequest = async (searchWord: string, preSearchWord: string | null) => {
    const result = await axios.get(GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord))
        .then (response => {
            const responseBody: GetSearchBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const getUserBoardListRequest = async (email: string) => {
    const result = await axios.get(GET_USER_BOARD_LIST_URL(email))
        .then(response => {
            const responseBody: GetUserBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const increaseViewCountRequest =async (boardNumber: number | string) => {
    const result = await axios.get(INCREASE_VIEW_COUNT_URL(boardNumber))
        .then(response => {
            const responseBody: IncreaseViewCountResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
        if (error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
        return result;
};

export const getTop3BoardListRequest = async () => {
    const result = await axios.get(GET_TOP_3_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetLatestBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
        if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const getLatestBoardListRequest = async () => {
    const result = await axios.get(GET_LATEST_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetLatestBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const getFavoriteListRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
        .then(response => {
            const responseBody: GetFavoriteListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

export const getCommentListRequest = async (boardNumber: number | string) => {
    const result = await axios. get(GET_COMMENT_LIST_URL(boardNumber))
        .then(response => {
            const responseBody: GetCommentListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const postCommentRequest = async (boardNumber: number | string, requestBody: PostCommentRequestDto, accessToken:string)=>{
    const result = await axios. post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostCommentResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}



export const patchBoardRequest = async (boardNumber: number | string, requestBody: PatchBoardRequestDto, accessToken:string)=>{
    const result = await axios. patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
        .then (response => {
            const responseBody: PatchBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;

}


export const putFavoriteRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios.put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
        .then(response => {
            const responseBody: PutFavoriteResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const deleteBoardRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
        .then(response => {
            const responseBody: DeleteBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
        });
    return result;
}

const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;
const GET_RELATION_LIST_URL = (searchWord: string) => `${API_DOMAIN}/search/${searchWord}/relation-list`;

export const getPopularListRequest = async () => {
    const result = await axios.get(GET_POPULAR_LIST_URL())
        .then(response => {
            const responseBody: GetPopularListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
        if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const getRelationListRequest = async (searchWord: string) => {
    const result = await axios.get(GET_RELATION_LIST_URL(searchWord))
        .then(response => {
            const responseBody: GetRelationListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

const GET_USER_URL=(email:string) => `${API_DOMAIN}/user/${email}`
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const PATCH_NICKNAME_URL = () => `${API_DOMAIN}/user/nickname`;
const PATCH_PROFILE_IMAGE_URL = () => `${API_DOMAIN}/user/profile-image`;


export const getUserRequest = async (email: string) => {
    const result = await axios.get(GET_USER_URL(email))
        .then(response => {
            const responseBody: GetUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const getSignInUserRequest = async (token: string) => {
  const result = await axios.get(
    GET_SIGN_IN_USER_URL(),
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  )
  .then(response => response.data)
  .catch(error => {
    if (!error.response) return null;
    return error.response.data;
  });

  return result;
};

export const patchNicknameRequest = async (requestBody: PatchNicknameRequestDto, accessToken: string) => {
    const result = await axios. patch(PATCH_NICKNAME_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchNicknameResponseDto = response.data;
            return responseBody;
            })
            .catch(error => {
                if (!error.response) return null;
                const responseBody: ResponseDto = error.response.data;
                return responseBody;
            });
        return result;
};

export const patchProfileImageRequest = async (requestBody: PatchProfileImageRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_PROFILE_IMAGE_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchProfileImageResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
};


const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const mutipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };

export const fileUploadRequest = async (data: FormData) => {
    const result = await axios. post(FILE_UPLOAD_URL(), data, mutipartFormData)
        .then(response => {
            const responseBody: string = response.data;
            return responseBody;
        })
        .catch(error => {
        return  null;
       
        })
        return result;
    }