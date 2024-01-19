package br.com.itneki.nekicard.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record SignUpUserDTO(
                            @Schema(example = "user@neki-it.com.br",
                            requiredMode = Schema.RequiredMode.REQUIRED)
                            @Email(message = "O campo (email) deve conter um e-mail válido")
                            @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@(neki-it\\.com\\.br|neki\\.com\\.br)$", message = "Formato de e-mail inválido")
                            String email,
                            @Schema(example = "user",
                            requiredMode = Schema.RequiredMode.REQUIRED)
                            @NotBlank(message = "O campo (nome) não pode ser nulo ou vazio")
                            String nome,
                            @Schema(example = "12345678",
                            requiredMode = Schema.RequiredMode.REQUIRED)
                            @Length(min = 8, max = 100, message = "A senha deve conter entre 8 e 100 caracteres")
                            String senha,

                            @Schema(example = "2000-01-01",
                                    requiredMode = Schema.RequiredMode.REQUIRED)
                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                            @Past(message = "O campo (data de nascimento) não pode estar no presente ou futuro")
                            LocalDate dataNascimento
                           ) {
}
