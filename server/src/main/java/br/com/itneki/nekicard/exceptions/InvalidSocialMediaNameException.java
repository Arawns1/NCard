package br.com.itneki.nekicard.exceptions;

import br.com.itneki.nekicard.socialmedia.domain.SocialMediaNames;

import java.util.Arrays;

public class InvalidSocialMediaNameException  extends RuntimeException{
    public InvalidSocialMediaNameException(){
        super("Error! Invalid social media name. Try: "+ Arrays.toString(SocialMediaNames.values()));
    }
}
