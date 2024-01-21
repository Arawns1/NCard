package br.com.itneki.nekicard.config;

import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.security.SignUpDTO;
import br.com.itneki.nekicard.user.dto.UserDetailsDTO;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        var modelMapper = new ModelMapper();
        modelMapper.typeMap(SignUpDTO.class, User.class).addMappings(mapper -> {
            mapper.map(SignUpDTO::getName, User::setName);
            mapper.map(SignUpDTO::getEmail, User::setEmail);
            mapper.map(SignUpDTO::getBirthdate, User::setBirthdate);
            mapper.map(SignUpDTO::getPassword, User::setPassword);
        });

        modelMapper.typeMap(User.class, UserDetailsDTO.class).addMappings(mapper -> {
            mapper.map(User::getId, UserDetailsDTO::setId);
            mapper.map(User::isStatus, UserDetailsDTO::setStatus);
            mapper.map(User::getName, UserDetailsDTO::setName);
            mapper.map(User::getEmail, UserDetailsDTO::setEmail);
            mapper.map(User::getBirthdate, UserDetailsDTO::setBirthdate);
            mapper.map(User::getProfilePhotoUrl, UserDetailsDTO::setProfilePhotoUrl);
            mapper.map(User::getLocality, UserDetailsDTO::setLocality);
            mapper.map(User::getDescription, UserDetailsDTO::setDescription);
            mapper.map(User::getWorkTime, UserDetailsDTO::setWorkTime);
            mapper.map(User::getWorkFunction, UserDetailsDTO::setWorkFunction);
            mapper.map(User::getSocialName, UserDetailsDTO::setSocialName);
            mapper.map(User::getPhone, UserDetailsDTO::setPhone);
            mapper.map(User::getCardList, UserDetailsDTO::setCardList);
            mapper.map(User::getSocialMediaList, UserDetailsDTO::setSocialMediaList);
        });

        return modelMapper;
    }
}
