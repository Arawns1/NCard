package br.com.itneki.nekicard.user.services;

import br.com.itneki.nekicard.exceptions.AuthenticationException;
import br.com.itneki.nekicard.exceptions.UserFoundException;
import br.com.itneki.nekicard.security.AuthResponse;
import br.com.itneki.nekicard.security.JWTProvider;
import br.com.itneki.nekicard.security.SignInDTO;
import br.com.itneki.nekicard.security.SignUpDTO;
import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.user.domain.UserRole;
import br.com.itneki.nekicard.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAuthService {
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    public AuthResponse save(SignUpDTO signUpDTO) {
        userRepository.findByEmail(signUpDTO.getEmail())
                      .ifPresent(userFound -> {
                          throw new UserFoundException();
                      });

        var user = modelMapper.map(signUpDTO, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setUserRole(UserRole.USER);
        var savedUser = userRepository.save(user);

        return JWTProvider.generateToken(String.valueOf(savedUser.getId()), savedUser.getUserRole().toString());
    }

    public AuthResponse auth(SignInDTO signInDTO){
        var user = userRepository.findByEmail(signInDTO.email())
                                 .orElseThrow(AuthenticationException::new);
        var passwordMatches = passwordEncoder.matches(signInDTO.password(), user.getPassword());

        if(!passwordMatches){
            throw new AuthenticationException();
        }
        return JWTProvider.generateToken(String.valueOf(user.getId()), String.valueOf(user.getUserRole()));
    }
}
