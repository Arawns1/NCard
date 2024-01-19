package br.com.itneki.nekicard.config;

import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.user.dto.SignUpUserDTO;
import br.com.itneki.nekicard.user.dto.UpdateUserDTO;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        var modelMapper = new ModelMapper();
        modelMapper.typeMap(SignUpUserDTO.class, User.class).addMappings(mapper -> {
            mapper.map(SignUpUserDTO::getNome, User::setName);
            mapper.map(SignUpUserDTO::getEmail, User::setEmail);
            mapper.map(SignUpUserDTO::getDataNascimento, User::setBirthdate);
            mapper.map(SignUpUserDTO::getSenha, User::setPassword);
        });

        return modelMapper;
    }
}
