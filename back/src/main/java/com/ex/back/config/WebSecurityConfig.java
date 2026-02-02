package com.ex.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

import org.springframework.security.web.AuthenticationEntryPoint;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;
import java.io.IOException;
import org.springframework.security.core.AuthenticationException;

import com.ex.back.filter.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration 
@EnableWebSecurity
@RequiredArgsConstructor

public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
      @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        
        httpSecurity
            .cors(cors -> cors
                .configurationSource(corsConfigrationSource())
            )
            .csrf(CsrfConfigurer :: disable)
            .httpBasic(HttpBasicConfigurer :: disable)
            .sessionManagement (sessionManagement -> sessionManagement
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(request -> request
                .requestMatchers("/files/**").permitAll()
                .requestMatchers("/", "/api/v1/auth/**", "/api/v1/search/**", "/files/**","/files/upload").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/board/**","/api/v1/user", "/api/v1/user/*").permitAll()
                .anyRequest().authenticated()
            )   
            .exceptionHandling(exceptionHandling -> exceptionHandling
                .authenticationEntryPoint(new FailedAuthenticationEntryPoint())
            )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return httpSecurity.build();

        }

    @Bean
    protected CorsConfigurationSource corsConfigrationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
    class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response,
                 AuthenticationException authException) throws IOException, ServletException{

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"code\":\"NP\", \"message\": \"Do not have permission.\"}");

    }
}

