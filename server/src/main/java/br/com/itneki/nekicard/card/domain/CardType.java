package br.com.itneki.nekicard.card.domain;

public enum CardType {
    BLACK("black"),
    DARK_BLUE("dark_blue"),
    BLUE("blue");

    private String type;
    CardType(String type) {
        this.type = type;
    }
}
