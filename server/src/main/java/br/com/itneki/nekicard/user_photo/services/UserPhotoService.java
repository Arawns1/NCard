package br.com.itneki.nekicard.user_photo.services;

import br.com.itneki.nekicard.exceptions.UserNotFoundException;
import br.com.itneki.nekicard.user.repository.UserRepository;
import br.com.itneki.nekicard.user_photo.domain.UserPhoto;
import br.com.itneki.nekicard.user_photo.dto.UserPhotoDTO;
import br.com.itneki.nekicard.user_photo.repository.UserPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserPhotoService {

    private final UserPhotoRepository repository;
    private final UserRepository userRepository;
    public UserPhoto findById(UUID id){
        return repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Error! Image not found with id: " + id)
        );
    }

    public UserPhotoDTO save(UUID id, MultipartFile image) throws IOException {
        var user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        var userPhoto = UserPhoto.builder()
                                .photo(image.getBytes())
                                .size(image.getSize())
                                .type(image.getContentType())
                                .user(user)
                                .build();

        var result = repository.save(userPhoto);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/image/{id}")
                .buildAndExpand(result.getId())
                .toUri();
        user.setProfilePhotoUrl(uri.toString());
        userRepository.save(user);
        return UserPhotoDTO.builder().id(id).photo_URL(uri.toString()).build();
    }
}
