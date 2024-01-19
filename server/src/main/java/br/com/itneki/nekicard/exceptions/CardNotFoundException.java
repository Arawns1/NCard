package br.com.itneki.nekicard.exceptions;

import br.com.itneki.nekicard.socialmedia.domain.SocialMediaNames;

import java.util.Arrays;
import java.util.UUID;

public class CardNotFoundException extends RuntimeException {

    public CardNotFoundException(UUID uuid){
        super("Card with id: "+ uuid +" not found");
    }
}
