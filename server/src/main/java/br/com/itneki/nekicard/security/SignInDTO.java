package br.com.itneki.nekicard.security;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record SignInDTO(
        @Schema(example = "user@neki-it.com.br",
                requiredMode = Schema.RequiredMode.REQUIRED)
        @Email(message = "O campo (email) deve conter um e-mail válido")
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@(neki-it\\.com\\.br|neki\\.com\\.br)$",
                message = "Formato de e-mail inválido. O email deve ser do domínio neki-it.com.br ou neki.com.br")
        String email,

        @Schema(example = "12345678",
                requiredMode = Schema.RequiredMode.REQUIRED)
        @Length(min = 8, max = 100, message = "A senha deve conter entre 8 e 100 caracteres")
        String password) {
}

