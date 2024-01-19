package br.com.itneki.nekicard.card.domain;

public enum CardType {
    BLACK("BLACK"),
    DARK_BLUE("DARK_BLUE"),
    BLUE("BLUE");

    private String type;
    CardType(String type) {
        this.type = type;
    }
}
