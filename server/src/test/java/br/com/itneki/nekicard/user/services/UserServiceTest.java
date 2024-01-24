package br.com.itneki.nekicard.user.services;

import br.com.itneki.nekicard.exceptions.UserNotFoundException;
import br.com.itneki.nekicard.socialmedia.service.SocialMediaService;
import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.user.dto.UserDetailsDTO;
import br.com.itneki.nekicard.user.repository.UserRepository;
import org.junit.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SocialMediaService socialMediaService;

    @Mock
    private ModelMapper modelMapper;



    UUID id = UUID.randomUUID();
    User user;

    @BeforeEach
    void setup(){
        user = new User();
        user.setId(id);
    }

    @Test
    @DisplayName("Deve retornar uma Page de UserDetails")
    void findAllSuccess() {
    }

    @Test
    @DisplayName("Deve retornar um UserDetailsDTO caso encontre o usuário pelo ID")
    void findByIdSuccess() {
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setId(id);

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDetailsDTO.class)).thenReturn(userDetailsDTO);

        UserDetailsDTO result = userService.findById(id);

        Assertions.assertNotNull(result);
        assertThat(result).isEqualTo(userDetailsDTO);

        verify(userRepository, times(1)).findById(id);
        verify(modelMapper, times(1)).map(user, UserDetailsDTO.class);
    }

    @Test
    @DisplayName("Deve retornar UserNotFoundException caso não encontre pelo id")
    void findByIdError(){
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> {
            userService.findById(id);
        });

        verify(modelMapper, never()).map(any(), eq(UserDetailsDTO.class));

    }


    @Test
    void update() {
    }

    @Test
    void delete() {
    }
}