package br.com.itneki.nekicard.exceptions;
public class UserFoundException extends RuntimeException {
    public UserFoundException(){
        super("The user already exists");
    }
}

