package com.ex.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ex.back.dto.request.auth.SignInRequestDto;
import com.ex.back.dto.request.auth.SignUpRequestDto;
import com.ex.back.dto.response.ResponseDto;
import com.ex.back.dto.response.auth.SignInResponseDto;
import com.ex.back.dto.response.auth.SignUpResponseDto;
import com.ex.back.entity.UserEntity;
import com.ex.back.provider.JwtProvider;
import com.ex.back.repository.UserRepository;

import com.ex.back.service.AuthService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService{

    private final UserRepository userRespository;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<?> signUp(SignUpRequestDto dto){
        try{
            String email = dto.getEmail();
            boolean existedEmail=userRespository.existsByEmail(email);
            if(existedEmail) return SignUpResponseDto.duplicateEmail();

            String nickname=dto.getNickname();
            boolean existedNickname=userRespository.existsByNickname(nickname);
            if(existedNickname) return SignUpResponseDto.duplicateNickname();
            
            String telNumber=dto.getTelNumber();
            boolean existedtelNumber=userRespository.existsByTelNumber(telNumber);
            if(existedtelNumber) return SignUpResponseDto.duplicateTelNumber();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity=new UserEntity(dto);
            userRespository.save(userEntity);
        } catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<?> signIn(SignInRequestDto dto) {
        String token = null;

        try{
            String email = dto.getEmail();
            UserEntity userEntity = userRespository.findByEmail(email);
            if(userEntity ==null) return SignInResponseDto.signInFail();

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if(!isMatched) return SignInResponseDto.signInFail();
            
            token = jwtProvider.create(email);

        } catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignInResponseDto.success(token);
    }
    
}
