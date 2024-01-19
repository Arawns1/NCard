package br.com.itneki.nekicard.socialmedia.domain;

public enum SocialMediaNames {
    LINKEDIN("LINKEDIN"),
    FACEBOOK("FACEBOOK"),
    GITHUB("GITHUB");
    private String name;
    SocialMediaNames(String name) {
        this.name = name;
    }
}
