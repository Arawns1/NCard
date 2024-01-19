package br.com.itneki.nekicard.socialmedia.repository;

import br.com.itneki.nekicard.socialmedia.domain.SocialMedia;
import br.com.itneki.nekicard.socialmedia.domain.SocialMediaNames;
import br.com.itneki.nekicard.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SocialMediaRepository extends JpaRepository<SocialMedia, UUID> {
    Optional<SocialMedia> findByNameAndUserId(SocialMediaNames name, UUID userId);
}
