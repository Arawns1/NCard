package br.com.itneki.nekicard.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final SecurityUserFilter securityUserFilter;
    private static final String[] PERMIT_ALL_LIST = {
            "/auth/**",
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**"};
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(PERMIT_ALL_LIST).permitAll()
                    .requestMatchers(HttpMethod.GET,"/user","/user/findAll").authenticated()
                    .requestMatchers(HttpMethod.GET,"/user/{id}").permitAll()
                    .anyRequest().authenticated()

                   )
            .addFilterBefore(securityUserFilter, BasicAuthenticationFilter.class);
        return  http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
