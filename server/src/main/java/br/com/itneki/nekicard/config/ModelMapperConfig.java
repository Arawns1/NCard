package br.com.itneki.nekicard.config;

import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.security.SignUpDTO;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        var modelMapper = new ModelMapper();
        modelMapper.typeMap(SignUpDTO.class, User.class).addMappings(mapper -> {
            mapper.map(SignUpDTO::getNome, User::setName);
            mapper.map(SignUpDTO::getEmail, User::setEmail);
            mapper.map(SignUpDTO::getDataNascimento, User::setBirthdate);
            mapper.map(SignUpDTO::getSenha, User::setPassword);
        });

        return modelMapper;
    }
}
