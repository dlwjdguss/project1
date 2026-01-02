package com.ex.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ex.back.dto.request.auth.SignInRequestDto;
import com.ex.back.dto.request.auth.SignUpRequestDto;
import com.ex.back.dto.response.auth.SignUpResponseDto;
import com.ex.back.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp( 
        @RequestBody @Valid SignUpRequestDto requestBody
        
    ){
         return authService.signUp(requestBody);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn( 
        @RequestBody @Valid SignInRequestDto requestBody
        
    ){
        return authService.signIn(requestBody);
    }
}


