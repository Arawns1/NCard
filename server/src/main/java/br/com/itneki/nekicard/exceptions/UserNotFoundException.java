package br.com.itneki.nekicard.exceptions;
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(){
        super("User not found");
    }
}

