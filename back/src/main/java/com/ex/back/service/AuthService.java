package com.ex.back.service;

import org.springframework.http.ResponseEntity;

import com.ex.back.dto.request.auth.SignInRequestDto;
import com.ex.back.dto.request.auth.SignUpRequestDto;
import com.ex.back.dto.response.auth.SignInResponseDto;
import com.ex.back.dto.response.auth.SignUpResponseDto;


public interface AuthService {
    ResponseEntity<?> signUp(SignUpRequestDto dto);
    ResponseEntity<?> signIn(SignInRequestDto dto);
}
