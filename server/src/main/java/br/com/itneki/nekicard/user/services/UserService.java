package br.com.itneki.nekicard.user.services;

import br.com.itneki.nekicard.exceptions.UserFoundException;
import br.com.itneki.nekicard.exceptions.UserNotFoundException;
import br.com.itneki.nekicard.socialmedia.domain.SocialMedia;
import br.com.itneki.nekicard.socialmedia.repository.SocialMediaRepository;
import br.com.itneki.nekicard.socialmedia.service.SocialMediaService;
import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.user.dto.SavedUserDTO;
import br.com.itneki.nekicard.user.dto.SignUpUserDTO;
import br.com.itneki.nekicard.user.dto.UpdateUserDTO;
import br.com.itneki.nekicard.user.repository.UserRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.sqm.sql.ConversionException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final SocialMediaService socialMediaService;

    private final ModelMapper modelMapper;

    public Page<User> findAll(Pageable paginacao){
        return userRepository.findAllByStatusTrue(paginacao);
    }

    public User findById(UUID id) {
        return userRepository.findById(id)
                             .orElseThrow(UserNotFoundException::new);
    }

    public SavedUserDTO save(SignUpUserDTO signUpUserDTO){
        userRepository.findByEmail(signUpUserDTO.getEmail())
                      .ifPresent(userFound -> {
                          throw new UserFoundException();
                      });

        var user = modelMapper.map(signUpUserDTO, User.class);
        var savedUser = userRepository.save(user);

        return new SavedUserDTO(savedUser);
    }

    public User update(UUID id, UpdateUserDTO updateUserDTO){
        var userFound = userRepository.findById(id)
                      .orElseThrow(UserNotFoundException::new);

        if(!updateUserDTO.mediaSocialList().isEmpty()){
           socialMediaService.save(updateUserDTO.mediaSocialList(), id);
        }

        return userFound.updateInfos(updateUserDTO);
    }

    public void delete(UUID id){
        var result = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        result.excluir();
    }

}
