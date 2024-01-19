package br.com.itneki.nekicard.user_photo.services;

import br.com.itneki.nekicard.exceptions.UserNotFoundException;
import br.com.itneki.nekicard.user.domain.User;
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
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserPhotoService {

    private final UserPhotoRepository repository;
    private final UserRepository userRepository;
    private final List<String> ACCEPTED_IMAGE_TYPES = new ArrayList<>(List.of("image/jpeg", "image/png", "image/jpg", "image/webp"));

    public UserPhoto findById(UUID id){
        return repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Error! Image not found with id: " + id)
        );
    }

    public UserPhotoDTO save(UUID userId, MultipartFile image) throws IOException {
        if (!ACCEPTED_IMAGE_TYPES.contains(image.getContentType())) {
            throw new IllegalArgumentException("Arquivo não suportado! Faça o upload de uma imagem do tipo: " + ACCEPTED_IMAGE_TYPES);
        }

        Optional<UserPhoto> userPhotoFound = repository.findByUserId(userId);

        UserPhoto userPhoto = userPhotoFound.orElseGet(UserPhoto::new);

        userPhoto.setPhoto(image.getBytes());
        userPhoto.setSize(image.getSize());
        userPhoto.setType(image.getContentType());

        if (userPhotoFound.isEmpty()) {
            var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
            userPhoto.setUser(user);
        }

        var result = repository.save(userPhoto);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/image/{id}")
                .buildAndExpand(result.getId())
                .toUri();

        User user = result.getUser();
        user.setProfilePhotoUrl(uri.toString());
        userRepository.save(user);

        return UserPhotoDTO.builder().id(result.getId()).photo_URL(uri.toString()).build();
    }

}
