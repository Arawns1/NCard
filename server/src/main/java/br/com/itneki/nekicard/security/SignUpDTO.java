package br.com.itneki.nekicard.security;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignUpDTO {

    @Schema(example = "user@neki-it.com.br",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @Email(message = "O campo (email) deve conter um e-mail válido")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@(neki-it\\.com\\.br|neki\\.com\\.br)$",
            message = "Formato de e-mail inválido. O email deve ser do domínio neki-it.com.br ou neki.com.br")
    private String email;

    @Schema(example = "user",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O campo (nome) não pode ser nulo ou vazio")
    private String nome;

    @Schema(example = "12345678",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @Length(min = 8, max = 100, message = "A senha deve conter entre 8 e 100 caracteres")
    private String senha;

    @Schema(example = "2000-01-01",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Past(message = "O campo (data de nascimento) não pode estar no presente ou futuro")
    private LocalDate dataNascimento;
}
