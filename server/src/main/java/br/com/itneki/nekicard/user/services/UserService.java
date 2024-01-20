package br.com.itneki.nekicard.user.services;

import br.com.itneki.nekicard.exceptions.UserNotFoundException;
import br.com.itneki.nekicard.socialmedia.service.SocialMediaService;
import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.user.dto.UpdateUserDTO;
import br.com.itneki.nekicard.user.dto.UserDetailsDTO;
import br.com.itneki.nekicard.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final SocialMediaService socialMediaService;

    private final ModelMapper modelMapper;

    public Page<UserDetailsDTO> findAll(Pageable paginacao) {
        Page<User> usersPage = userRepository.findAllByStatusTrue(paginacao);
        return usersPage.map(user -> modelMapper.map(user, UserDetailsDTO.class));
    }

    public UserDetailsDTO findById(UUID id) {
        var user = userRepository.findById(id)
                                 .orElseThrow(UserNotFoundException::new);

        return modelMapper.map(user, UserDetailsDTO.class);
    }

    public User update(UUID id, UpdateUserDTO updateUserDTO) {
        var userFound = userRepository.findById(id)
                                      .orElseThrow(UserNotFoundException::new);

        if (!updateUserDTO.mediaSocialList().isEmpty()) {
            socialMediaService.save(updateUserDTO.mediaSocialList(), id);
        }

        return userFound.updateInfos(updateUserDTO);
    }

    public void delete(UUID id) {
        var result = userRepository.findById(id)
                                   .orElseThrow(UserNotFoundException::new);
        result.excluir();
    }
}

