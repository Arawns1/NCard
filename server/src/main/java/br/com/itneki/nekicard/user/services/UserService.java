package br.com.itneki.nekicard.user.services;

import br.com.itneki.nekicard.exceptions.UserFoundException;
import br.com.itneki.nekicard.exceptions.UserNotFoundException;
import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.user.dto.SavedUserDTO;
import br.com.itneki.nekicard.user.dto.SignUpUserDTO;
import br.com.itneki.nekicard.user.dto.UserUpdateDTO;
import br.com.itneki.nekicard.user.repository.UserRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.sqm.sql.ConversionException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Page<User> findAll(Pageable paginacao){
        return userRepository.findAllByStatusTrue(paginacao);
    }

    public User findById(UUID id) {
        return userRepository.findById(id)
                             .orElseThrow(UserNotFoundException::new);
    }

    public SavedUserDTO save(SignUpUserDTO signUpUserDTO){
        userRepository.findByEmail(signUpUserDTO.email())
                      .ifPresent(userFound -> {
                          throw new UserFoundException();
                      });
        User user = User.builder()
                        .name(signUpUserDTO.nome())
                        .email(signUpUserDTO.email())
                        .birthdate(signUpUserDTO.dataNascimento())
                        .password(signUpUserDTO.senha())
                        .build();
        var savedUser = userRepository.save(user);
        return new SavedUserDTO(savedUser);
    }

    public User update(UUID id, UserUpdateDTO userUpdateDTO){
        var userFound = userRepository.findById(id)
                      .orElseThrow(UserNotFoundException::new);

        userFound.setSocialName(userUpdateDTO.socialName());
        userFound.setLocality(userUpdateDTO.locality());
        userFound.setDescription(userUpdateDTO.description());
        userFound.setPhone(userUpdateDTO.phone());
        userFound.setWorkTime(userUpdateDTO.worktime());
        userFound.setWorkFunction(userUpdateDTO.workFunction());

        return userRepository.save(userFound);
    }

    public void delete(UUID id){
        var result = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        result.excluir();
    }

//    public SavedUserDTO signupUser(String userJson, MultipartFile profilePhoto) throws IOException {
//        User user = convertUserFromString(userJson);
//        UserPhoto userPhoto = UserPhoto.builder()
//                                       .photo(profilePhoto.getBytes())
//                                       .size(profilePhoto.getSize())
//                                       .type(profilePhoto.getContentType())
//                                       .build();
//        user.setUserPhoto(userPhoto);
//
//        var savedUser = userRepository.save(user);
//
//        URI uri = ServletUriComponentsBuilder
//                .fromCurrentContextPath()
//                .path("/image/{id}")
//                .buildAndExpand(savedUser.getId())
//                .toUri();
//
//        return new SavedUserDTO(savedUser.getEmail(), savedUser.getName(), savedUser.getBirthdate(), uri.toString());
//    }

    private User convertUserFromString(String userJson) {
        User user;
        try {
            ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
                    false);
            objectMapper.registerModule(new JavaTimeModule());
            user = objectMapper.readValue(userJson, User.class);
        } catch (IOException err) {
            throw new ConversionException("Error! Failed to convert to User Class. Caused by: "+ err.getCause());
        }
        return user;
    }

}
