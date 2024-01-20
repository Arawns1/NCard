package br.com.itneki.nekicard.exceptions;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(){
        super("Username/password incorrect");
    }
}
