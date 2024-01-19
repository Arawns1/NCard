package br.com.itneki.nekicard.socialmedia.service;

import br.com.itneki.nekicard.exceptions.InvalidSocialMediaNameException;
import br.com.itneki.nekicard.socialmedia.domain.SocialMedia;
import br.com.itneki.nekicard.socialmedia.domain.SocialMediaNames;
import br.com.itneki.nekicard.socialmedia.dto.SaveSocialMediaDTO;
import br.com.itneki.nekicard.socialmedia.repository.SocialMediaRepository;
import br.com.itneki.nekicard.user.repository.UserRepository;
import br.com.itneki.nekicard.user.services.UserService;
import jakarta.persistence.PrePersist;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SocialMediaService {

    private final SocialMediaRepository repository;
    public void save(List<SaveSocialMediaDTO> listDto, UUID userId){
        listDto.forEach(dto -> validateSocialMedia(dto, userId));
    }

    private void validateSocialMedia(SaveSocialMediaDTO dto, UUID userId){
        try{
            SocialMediaNames.valueOf(dto.name().toUpperCase());
        }catch(Exception e){
            throw new InvalidSocialMediaNameException();
        }

      repository.findByNameAndUserId(SocialMediaNames.valueOf(dto.name().toUpperCase()), userId)
                 .ifPresentOrElse(socialMedia -> socialMedia.update(dto),
                                            () -> {SocialMedia newSocialMedia = new SocialMedia(dto, userId);
                                                 repository.save(newSocialMedia);});
    }

    public void deleteSocialMedia(UUID id) {
        repository
                .findById(id)
                .ifPresentOrElse((socialMedia) -> repository.deleteById(id),
                                 () -> {
                                     throw new NoSuchElementException("Social media with id: " + id + " not found");
                                 });
    }
}
