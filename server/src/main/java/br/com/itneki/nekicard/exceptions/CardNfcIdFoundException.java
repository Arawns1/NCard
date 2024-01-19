package br.com.itneki.nekicard.exceptions;

public class CardNfcIdFoundException extends RuntimeException{
    public CardNfcIdFoundException(){
        super("Error! The nfc id already exists!");
    }
}
