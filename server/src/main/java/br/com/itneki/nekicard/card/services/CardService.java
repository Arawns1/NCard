package br.com.itneki.nekicard.card.services;

import br.com.itneki.nekicard.card.domain.Card;
import br.com.itneki.nekicard.card.domain.CardType;
import br.com.itneki.nekicard.card.dto.SaveCardDTO;
import br.com.itneki.nekicard.card.repository.CardRepository;
import br.com.itneki.nekicard.exceptions.*;
import br.com.itneki.nekicard.socialmedia.domain.SocialMediaNames;
import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;
    @Value("${frontEnd.baseURL}")
    private String qrCodeBaseURL;

    public Card findById(UUID id) {
        return cardRepository.findById(id)
                             .orElseThrow(() -> new CardNotFoundException(id));

    }

    public Card findByNfcId(String nfcId){
        return cardRepository.findByNfcId(nfcId).orElseThrow(NoSuchElementException::new);
    }

    public Card save(SaveCardDTO saveCardDTO, UUID userId){
        cardRepository.findByNfcId(saveCardDTO.getNfcId())
                      .ifPresent(cardFound -> {
                          throw new CardNfcIdFoundException();
                      });

        var userFound = userRepository.findById(userId)
                      .orElseThrow(UserNotFoundException::new);
         try {
            Card card = Card.builder()
                 .nfcId(saveCardDTO.getNfcId())
                 .type(CardType.valueOf(saveCardDTO.getType()))
                 .user(userFound)
                 .userId(userId)
                 .qrCodeURL(qrCodeBaseURL+"/user/"+userFound.getId())
                 .build();
             return cardRepository.save(card);
         }catch(IllegalArgumentException e){
            throw new InvalidCardTypeException();
        }
    }

    public void delete(UUID id){
        var result = cardRepository.findById(id)
                                   .orElseThrow(() -> new CardNotFoundException(id));
        result.excluir();
    }
}
