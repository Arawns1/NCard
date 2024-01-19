package br.com.itneki.nekicard.exceptions;

import br.com.itneki.nekicard.card.domain.CardType;
import br.com.itneki.nekicard.socialmedia.domain.SocialMediaNames;

import java.util.Arrays;

public class InvalidCardTypeException extends RuntimeException {
    public InvalidCardTypeException(){
        super("Error! Invalid card type. Try: "+ Arrays.toString(CardType.values()));
    }
}
