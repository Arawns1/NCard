package br.com.itneki.nekicard.user.dto;

import br.com.itneki.nekicard.user.domain.User;

import java.time.LocalDate;
import java.util.UUID;

public record SavedUserDTO(UUID id,
                           String nome,
                           String email,
                           LocalDate dataNascimento
                           ) {

    public SavedUserDTO(User user){
        this(user.getId(), user.getName(), user.getEmail(),user.getBirthdate());
    }
}
