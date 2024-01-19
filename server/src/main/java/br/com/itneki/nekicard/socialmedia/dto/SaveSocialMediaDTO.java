package br.com.itneki.nekicard.socialmedia.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

public record SaveSocialMediaDTO(
                                @Schema(example = "Linkedin",
                                        requiredMode = Schema.RequiredMode.REQUIRED)
                                String name,
                                @Schema(example = "https://linkedin.com.br/user",
                                        requiredMode = Schema.RequiredMode.REQUIRED)
                                String url) {
}
