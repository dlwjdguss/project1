package com.ex.back.service;

import org.springframework.http.ResponseEntity;

import com.ex.back.dto.request.user.PatchNicknameRequestDto;
import com.ex.back.dto.request.user.PatchProfileImageRequestDto;
import com.ex.back.dto.response.user.GetSignInUserResponseDto;
import com.ex.back.dto.response.user.GetUserResponseDto;
import com.ex.back.dto.response.user.PatchNicknameResponseDto;
import com.ex.back.dto.response.user.PatchProfileImageResponseDto;

public interface UserService {

    ResponseEntity<? super GetUserResponseDto> getUser(String email);
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
    ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email);
    ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email);
      
}

