package br.com.itneki.nekicard.user_photo.services;

import br.com.itneki.nekicard.user_photo.domain.UserPhoto;
import br.com.itneki.nekicard.user_photo.dto.UserPhotoDTO;
import br.com.itneki.nekicard.user_photo.repository.UserPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserPhotoService {

    private final UserPhotoRepository repository;
    public UserPhoto findById(UUID id){
        return repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Error! Image not found with id: " + id)
        );
    }

    public UserPhoto findByUser(UUID id){
        return repository.findByUserId(id).orElseThrow(() ->
                new NoSuchElementException("Error! Image not found with User id: " + id)
        );
    }

    public UserPhotoDTO save(UUID id, MultipartFile image) throws IOException {
        var result = repository.save(new UserPhoto(image.getBytes(), image.getContentType(), image.getSize(), id));
        return UserPhotoDTO.builder().id(result.getId()).build();
    }
}
