package br.com.itneki.nekicard.card.repository;

import br.com.itneki.nekicard.card.domain.Card;
import br.com.itneki.nekicard.socialmedia.domain.SocialMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CardRepository extends JpaRepository<Card, UUID> {
    Optional<Card> findByNfcId(String nfcId);
}
